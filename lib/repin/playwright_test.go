package main

import (
	"github.com/playwright-community/playwright-go"
	"github.com/stretchr/testify/assert"
	"testing"
)

func BenchmarkRunPlaywright(b *testing.B) {
	screenshotter := NewScreenshotter(playwright.LocatorScreenshotOptions{
		Type: playwright.ScreenshotTypePng,
	})

	params := map[string][]string{
		"prefix": {"Короче"},
		"name":   {"Санкт-Петербург"},
		"image":  {"https://photo.hotellook.com/static/cities/388x388/LED.jpg"},
		"layer":  {"Неочевидные советы"},
		"count":  {"10 подборок от местных"},
		"walk":   {"Прогулка по городу"},
	}

	for i := 0; i < b.N; i++ {
		_, err := generateImage(screenshotter, "guides", params)
		assert.Nil(b, err)
	}

}
