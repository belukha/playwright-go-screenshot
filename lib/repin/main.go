package main

import (
	"fmt"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/playwright-community/playwright-go"
)

func transformValues(values map[string][]string) map[string]string {
	transformed := make(map[string]string)
	for key, value := range values {
		if len(value) > 0 {
			transformed[key] = value[0]
		}
	}
	return transformed
}

func main() {
	e := echo.New()

	screenshotter := NewScreenshotter(playwright.LocatorScreenshotOptions{
		Type: playwright.ScreenshotTypePng,
	})

	e.GET("/", func(c echo.Context) error {
		template := c.QueryParam("template")

		params := transformValues(c.QueryParams())

		err := RenderIntoFile(template, params)

		if err != nil {
			return err
		}

		start := time.Now()
		image, err := screenshotter.Screenshot(template)
		elapsed := time.Since(start)

		fmt.Println("Screenshot took", elapsed)

		if err != nil {
			return err
		}

		c.Response().Header().Set("Content-Type", "image/png")

		_, err = c.Response().Write(image)

		if err != nil {
			return err
		}

		return nil
	})

	e.Logger.Fatal(e.Start(":1323"))
}
