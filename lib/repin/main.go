package main

import (
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/playwright-community/playwright-go"
	"os"
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

		image, err := generateImage(screenshotter, template, c.QueryParams())

		c.Response().Header().Set("Content-Type", "image/png")

		_, err = c.Response().Write(image)

		if err != nil {
			return err
		}

		return nil
	})

	e.Logger.Fatal(e.Start(":1323"))
}

func generateImage(screenshotter *Screenshotter, template string, queryParams map[string][]string) ([]byte, error) {
	params := transformValues(queryParams)

	filename := uuid.New().String() + ".html"
	err := RenderIntoFile(template, params, filename)
	if err != nil {
		return nil, err
	}

	image, err := screenshotter.Screenshot(template, filename)

	errRemove := os.Remove("../../src/guides/" + filename)
	if errRemove != nil {
		return nil, errRemove
	}

	return image, err
}
