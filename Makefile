.PHONY: help install dev build lint typecheck clean setup

# Default target
help: ## Show available targets
	@echo ""
	@echo "🛒 Kiddie Mart - Available Commands"
	@echo "======================================"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""

install: ## Install project dependencies
	npm install

dev: ## Start development server on port 9002
	npm run dev

build: ## Build the project for production
	npm run build

lint: ## Run linter
	npm run lint

typecheck: ## Run TypeScript type checking
	npm run typecheck

clean: ## Remove build artifacts and node_modules
	rm -rf .next node_modules

setup: install ## Full project setup (install + verify)
	@echo ""
	@echo "✅ Setup complete! Run 'make dev' to start the development server."
	@echo "   Then open http://localhost:9002 in your browser."
	@echo ""
