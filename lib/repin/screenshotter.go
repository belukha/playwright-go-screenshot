package main

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/playwright-community/playwright-go"
)

type Screenshotter struct {
	page              playwright.Page
	screenshotOptions playwright.LocatorScreenshotOptions
	baseUrl           string
}

var (
	srcPath = "../../src/"
)

func buildBaseUrl() (*string, error) {
	cwd, err := os.Getwd()

	if err != nil {
		return nil, err
	}

	path, err := filepath.Abs(filepath.Join(cwd, srcPath))

	baseUrl := "FILE://" + path

	if err != nil {
		return nil, err
	}

	return &baseUrl, nil
}

func NewScreenshotter(options playwright.LocatorScreenshotOptions) *Screenshotter {
	pw, err := playwright.Run()

	if err != nil {
		panic(err)
	}

	browser, err := pw.Firefox.Launch()

	if err != nil {
		panic(err)
	}

	page, err := browser.NewPage()

	if err != nil {
		panic(err)
	}

	baseUrl, err := buildBaseUrl()

	if err != nil {
		panic(err)
	}

	return &Screenshotter{
		page:              page,
		screenshotOptions: options,
		baseUrl:           *baseUrl,
	}
}

func (s *Screenshotter) Screenshot(templateName string) ([]byte, error) {
	_, err := s.page.Goto(fmt.Sprintf("%s/%s/index.html", s.baseUrl, templateName))

	if err != nil {
		return nil, err
	}

	res, err := s.page.Locator(".content").Screenshot(s.screenshotOptions)

	if err != nil {
		return nil, err
	}

	return res, nil
}
