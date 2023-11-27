package main

import (
	"os"
	"path/filepath"

	"github.com/cbroglie/mustache"
)

func RenderIntoFile(template string, params map[string]string, filename string) error {
	cwd, err := os.Getwd()

	if err != nil {
		return err
	}

	templatePath := filepath.Join(cwd, srcPath, template, "index.html.mustache")

	data, err := mustache.RenderFile(templatePath, params)

	if err != nil {
		return err
	}

	file, err := os.Create(filepath.Join(cwd, srcPath, template, filename))

	if err != nil {
		return err
	}

	_, err = file.WriteString(data)

	if err != nil {
		return err
	}

	return nil
}
