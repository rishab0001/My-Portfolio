#!/bin/bash

# Rishab Portfolio Website Setup Script
# Author: Rishab (rishabpal2003@gmail.com)
# Description: Automated setup script for the portfolio website project

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Project details
PROJECT_NAME="Rishab Portfolio Website"
PROJECT_VERSION="1.0.0"
AUTHOR="Rishab"

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}================================${NC}"
    echo -e "${PURPLE}  $PROJECT_NAME Setup${NC}"
    echo -e "${PURPLE}  Version: $PROJECT_VERSION${NC}"
    echo -e "${PURPLE}  Author: $AUTHOR${NC}"
    echo -e "${PURPLE}================================${NC}"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to create .vscode directory and settings
setup_vscode() {
    print_info "Setting up VS Code workspace configuration..."

    # Create .vscode directory if it doesn't exist
    if [ ! -d ".vscode" ]; then
        mkdir -p .vscode
        print_success "Created .vscode directory"
    fi

    # Create VS Code settings.json
    cat > .vscode/settings.json << 'EOL'
{
    "editor.formatOnSave": true,
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "files.trimTrailingWhitespace": true,
    "files.insertFinalNewline": true,
    "html.format.indentInnerHtml": true,
    "css.validate": true,
    "javascript.validate.enable": true,
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "liveServer.settings.donotShowInfoMsg": true,
    "liveServer.settings.port": 5500,
    "liveServer.settings.root": "/",
    "workbench.colorTheme": "Default Dark+",
    "editor.wordWrap": "on",
    "editor.lineNumbers": "on",
    "editor.minimap.enabled": true
}
EOL

    # Create launch.json for debugging
    cat > .vscode/launch.json << 'EOL'
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Open with Live Server",
            "type": "node",
            "request": "launch",
            "program": "${workspaceFolder}/index.html",
            "runtimeExecutable": "open",
            "runtimeArgs": ["-a", "Google Chrome"]
        }
    ]
}
EOL

    print_success "VS Code workspace configuration created"
}

# Function to create package.json
create_package_json() {
    print_info "Creating package.json file..."

    cat > package.json << 'EOL'
{
    "name": "rishab-portfolio",
    "version": "1.0.0",
    "description": "A modern, responsive portfolio website for Rishab featuring dark/light mode toggle and interactive elements",
    "main": "index.html",
    "scripts": {
        "start": "echo 'Open index.html with Live Server or your preferred local server'",
        "dev": "echo 'Use Live Server extension in VS Code for development'",
        "build": "echo 'This is a static site - no build process needed'",
        "deploy": "echo 'Deploy to GitHub Pages, Netlify, or Vercel'",
        "validate": "echo 'HTML and CSS validation - use W3C validators'"
    },
    "keywords": [
        "portfolio",
        "website",
        "frontend",
        "html",
        "css",
        "javascript",
        "responsive",
        "dark-mode",
        "interactive"
    ],
    "author": {
        "name": "Rishab",
        "email": "rishabpal2003@gmail.com",
        "url": "https://github.com/rishab0001"
    },
    "license": "MIT",
    "homepage": "https://github.com/rishab0001/portfolio",
    "repository": {
        "type": "git",
        "url": "https://github.com/rishab0001/portfolio.git"
    },
    "bugs": {
        "url": "https://github.com/rishab0001/portfolio/issues"
    },
    "engines": {
        "node": ">=14.0.0"
    },
    "devDependencies": {},
    "dependencies": {}
}
EOL

    print_success "package.json created successfully"
}

# Function to create .gitignore
create_gitignore() {
    print_info "Creating .gitignore file..."

    cat > .gitignore << 'EOL'
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# Local development
.local
dist/
build/
EOL

    print_success ".gitignore created successfully"
}

# Function to check system requirements
check_requirements() {
    print_info "Checking system requirements..."

    # Check for Git
    if command_exists git; then
        GIT_VERSION=$(git --version | cut -d' ' -f3)
        print_success "Git found (version: $GIT_VERSION)"
    else
        print_warning "Git not found. Install Git for version control: https://git-scm.com/"
    fi

    # Check for VS Code
    if command_exists code; then
        print_success "VS Code found"
        VS_CODE_AVAILABLE=true
    else
        print_warning "VS Code not found. Download from: https://code.visualstudio.com/"
        VS_CODE_AVAILABLE=false
    fi

    # Check for Node.js (optional)
    if command_exists node; then
        NODE_VERSION=$(node --version)
        print_success "Node.js found ($NODE_VERSION)"
    else
        print_info "Node.js not required for this project, but recommended for development tools"
    fi

    # Check for common browsers
    if command_exists google-chrome-stable || command_exists google-chrome || command_exists chrome; then
        print_success "Chrome browser found"
    elif command_exists firefox; then
        print_success "Firefox browser found"
    else
        print_info "Please ensure you have a modern web browser installed"
    fi
}

# Function to setup development environment
setup_development() {
    print_info "Setting up development environment..."

    # Create project directories if they don't exist
    mkdir -p assets/{images,icons}
    mkdir -p docs

    print_success "Project directories created"

    # Set proper file permissions
    chmod 644 *.html *.css *.js *.md 2>/dev/null || true
    chmod 755 . 2>/dev/null || true

    print_success "File permissions set"
}

# Function to validate project files
validate_files() {
    print_info "Validating project files..."

    # Check for required files
    REQUIRED_FILES=("index.html" "style.css" "app.js")

    for file in "${REQUIRED_FILES[@]}"; do
        if [ -f "$file" ]; then
            print_success "$file found"
        else
            print_error "$file is missing!"
            exit 1
        fi
    done

    # Check HTML syntax (basic check)
    if command_exists python3; then
        python3 -c "
import html.parser
import sys

class HTMLValidator(html.parser.HTMLParser):
    def error(self, message):
        print(f'HTML Error: {message}')
        sys.exit(1)

try:
    with open('index.html', 'r') as f:
        content = f.read()

    validator = HTMLValidator()
    validator.feed(content)
    print('HTML syntax validation passed')
except Exception as e:
    print(f'HTML validation error: {e}')
" || print_warning "HTML validation skipped"
    fi
}

# Function to provide next steps
show_next_steps() {
    echo ""
    print_success "Setup completed successfully! 🎉"
    echo ""
    echo -e "${BLUE}📋 Next Steps:${NC}"
    echo ""
    echo -e "  ${YELLOW}1.${NC} Open VS Code:"
    echo -e "     ${GREEN}code .${NC}"
    echo ""
    echo -e "  ${YELLOW}2.${NC} Install recommended VS Code extensions:"
    echo -e "     • Live Server (ritwickdey.liveserver)"
    echo -e "     • HTML CSS Support (ecmel.vscode-html-css)"
    echo -e "     • Prettier - Code formatter (esbenp.prettier-vscode)"
    echo -e "     • Auto Rename Tag (formulahendry.auto-rename-tag)"
    echo ""
    echo -e "  ${YELLOW}3.${NC} Start development server:"
    echo -e "     • Right-click on index.html in VS Code"
    echo -e "     • Select 'Open with Live Server'"
    echo -e "     • Or press ${GREEN}Alt+L Alt+O${NC}"
    echo ""
    echo -e "  ${YELLOW}4.${NC} View your portfolio:"
    echo -e "     • Open ${GREEN}http://127.0.0.1:5500${NC} in your browser"
    echo -e "     • Test both light and dark themes"
    echo -e "     • Check responsive design on different screen sizes"
    echo ""
    echo -e "  ${YELLOW}5.${NC} Customize your portfolio:"
    echo -e "     • Update personal information in index.html"
    echo -e "     • Add your own projects and descriptions"
    echo -e "     • Modify colors and styling in style.css"
    echo -e "     • Add your social media links"
    echo ""
    echo -e "${BLUE}🛠️  Development Tips:${NC}"
    echo -e "  • Use browser developer tools for testing"
    echo -e "  • Test on different devices and browsers"
    echo -e "  • Validate HTML/CSS using W3C validators"
    echo -e "  • Optimize images before deployment"
    echo ""
    echo -e "${BLUE}🚀 Deployment Options:${NC}"
    echo -e "  • GitHub Pages (free)"
    echo -e "  • Netlify (free tier available)"
    echo -e "  • Vercel (free tier available)"
    echo ""
    echo -e "${GREEN}Happy coding! 💻✨${NC}"
    echo ""
    echo -e "${PURPLE}For support: rishabpal2003@gmail.com${NC}"
}

# Main setup function
main() {
    clear
    print_header
    echo ""

    # Check if we're in the right directory
    if [ ! -f "index.html" ]; then
        print_error "index.html not found! Please run this script in the project directory."
        exit 1
    fi

    print_info "Starting automated setup..."
    echo ""

    # Run setup functions
    check_requirements
    echo ""

    validate_files
    echo ""

    setup_vscode
    echo ""

    create_package_json
    echo ""

    create_gitignore
    echo ""

    setup_development
    echo ""

    show_next_steps

    # Open VS Code if available
    if [ "$VS_CODE_AVAILABLE" = true ]; then
        echo -e "${YELLOW}Would you like to open the project in VS Code now? (y/n):${NC} \c"
        read -r response
        if [ "$response" = "y" ] || [ "$response" = "Y" ] || [ "$response" = "yes" ]; then
            print_info "Opening project in VS Code..."
            code .
        fi
    fi
}

# Handle script interruption
trap 'echo ""; print_error "Setup interrupted!"; exit 1' INT

# Run main function
main "$@"
