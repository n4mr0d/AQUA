# AQUAEQUIPEMENT

AQUAEQUIPEMENT is a bilingual corporate website for an Algerian water and hydromechanical equipment company. The project is a static front-end site with a lightweight Node.js HTTP server for local development and preview.

## Overview

The site presents:

- Company profile and expertise
- Product and solution offerings
- Sector focus and references
- Contact and quotation request information
- French and English language toggle
- Responsive layout for desktop and mobile devices

## Project structure

```text
AQUA/
├── index.html          # Main landing page
├── server.js           # Small HTTP server for local preview
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── app.js          # Front-end interactions
│   └── translations.js # French/English text content
├── assets/
│   ├── images/         # Brand and project imagery
│   └── ...
├── works-pictures/     # Reference project images
├── logo-client/        # Client logo assets
├── AQUA-LOGO/          # Brand assets
└── README.md           # Project documentation
```

## Deploy and start locally

No build or deployment step is needed for a local preview. Open PowerShell in the project folder and run:

```powershell
Set-Location -LiteralPath "n:\DESIGN\AQUA EQUIPEMENT\webb\NEW2026\AQUA"
node .\server.js
```

Keep that terminal open while the server is running, then visit:

```text
http://127.0.0.1:8080/
```

Stop the local server with `Ctrl+C` in the terminal. This starts a local preview only; it does not publish the site to a public hosting provider.

## Create the production `dist` folder

Run these commands in PowerShell from the project root. They copy only the files needed to serve the website into `dist`:

```powershell
$dist = ".\dist"
New-Item -ItemType Directory -Force -Path "$dist\css", "$dist\js", "$dist\assets", "$dist\logo-client" | Out-Null
Copy-Item ".\index.html", ".\server.js" -Destination $dist -Force
Copy-Item ".\css\style.css" -Destination "$dist\css" -Force
Copy-Item ".\js\*.js" -Destination "$dist\js" -Force
Copy-Item ".\assets\*" -Destination "$dist\assets" -Recurse -Force
Copy-Item ".\logo-client\*" -Destination "$dist\logo-client" -Recurse -Force
```

The generated `dist` folder includes the Node server as well as the site files and referenced images. Upload the contents of `dist` for production deployment.

## Deploy to production (Linux VPS)

Upload the contents of `dist` to the VPS (for example, to `/var/www/aqua`) and make sure Node.js is installed. The included server listens on `127.0.0.1:8080`, so configure a public-facing reverse proxy such as Nginx to forward requests to that address; enable HTTPS on the proxy for your domain.

Run the server persistently with `systemd`:

```bash
sudo tee /etc/systemd/system/aqua-website.service > /dev/null <<'EOF'
[Unit]
Description=AQUAEQUIPEMENT website
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/aqua
ExecStart=/usr/bin/node /var/www/aqua/server.js
Restart=on-failure
User=www-data

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now aqua-website
sudo systemctl status aqua-website
```

If Node.js is installed somewhere other than `/usr/bin/node`, update `ExecStart` to the path returned by `command -v node`. After uploading updated site files, restart the service with:

```bash
sudo systemctl restart aqua-website
```

## Notes

- This is a static site; there is no build step or package installation required.
- The Node server serves the files directly from the project folder.
- The site uses browser-side JavaScript for translation switching and UI behavior.

## Assets and branding

The project includes company branding, partner assets, and imagery for industrial water treatment, desalination, filtration, and pumping systems.
