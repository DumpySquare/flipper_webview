# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**⚠️ PROTOTYPE REPOSITORY ⚠️**

This is a **prototype/experimental** repository for the "Flipper Webview" VSCode extension. This code is for testing concepts and exploring ideas only.

**Production codebase:** https://github.com/f5devcentral/vscode-f5-flipper

This prototype provides an enhanced HTML interface for viewing and editing Citrix NetScaler (NS) application configurations. The extension allows toggling between different data views and uses FAST templates to render NetScaler configurations as F5 AS3 JSON.

## Key Commands

### Development Commands
- `npm run compile` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for TypeScript changes and recompile
- `npm run lint` - Run TypeScript type checking and ESLint
- `npm test` - Run test suite with nyc/mocha
- `npm run build-package` - Compile and create package
- `npm run publish-package` - Compile and publish to registry

### VSCode Extension Commands
- **Ctrl+Shift+P** → "Flipper Webview: Start" - Launch the webview interface

## Architecture

### Core Components

**Extension Entry Point** (`src/extension.ts`)
- Main activation function that registers the `flipperWebview.start` command
- Creates webview panel with dual-pane interface (NS JSON + FAST template editor)
- Integrates F5 FAST core engine for template processing
- Auto-activates webview when extension loads

**Data Models** (`src/models.ts`)
- Comprehensive TypeScript types for NetScaler ADC configurations
- `AdcApp` - Main type representing load balancer, content switching, or GSLB virtual servers
- `NsFastTempParams` - Parameters structure for FAST template rendering
- ADC regex tree and configuration object types for parsing NS configs

**Webview Interface** (`media/index.html`)
- Split-pane layout with resizable Monaco editor (left) and JSON Editor (right)
- Monaco editor displays NetScaler app JSON with syntax highlighting
- JSON Editor provides form-based editing using FAST template schema
- Real-time synchronization between editors via change listeners

### Template System

**FAST Templates** (`templates/`)
- YAML-based F5 FAST templates defining AS3 schema and rendering logic
- `HTTP.yaml` - Main template for HTTP applications with pool members, persistence, monitors
- Uses Mustache templating for dynamic AS3 JSON generation

**Sample Data** (`applications/`)
- `fn2187.ns.json` - Example NetScaler configuration showing structure
- Contains parsed NS config with bindings, service groups, and FAST parameters

## Dependencies

- **@f5devcentral/f5-fast-core** - F5 FAST template engine for AS3 generation
- **deepmerge-ts** - Type-safe object merging utilities
- **Monaco Editor** - Code editor for JSON editing (loaded via CDN)
- **JSON Editor** - Form-based JSON editing (loaded via CDN)

## Development Workflow

1. Modify TypeScript source in `src/`
2. Run `npm run compile` to transpile
3. Test in VSCode extension development host
4. Use `npm run lint` to check code quality
5. Run `npm test` for unit testing

## Key Integration Points

- Extension reads NetScaler JSON from `applications/fn2187.ns.json`
- FAST template loaded from `templates/HTTP.yaml` 
- Webview displays both raw NS config and FAST template parameters
- User edits template parameters to generate AS3 JSON output
- Monaco and JSON editors stay synchronized via JavaScript event handlers