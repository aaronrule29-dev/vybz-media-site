VYBZ MEDIA — CMS WEBSITE SETUP

WHAT YOU GET
- Live website: same visual design and existing Nike images.
- Admin editor: https://YOUR-SITE.netlify.app/admin/
- Edit hero text, project images/cards, services, about, contact and Instagram URL.

ONE-TIME SETUP (REQUIRED FOR ONLINE SAVING)
1. Create a FREE GitHub account if needed. Create a repository named vybz-media-site.
2. Upload ALL files and folders from this ZIP to the ROOT of that repository (not the ZIP itself).
   Important: include the admin, content and assets folders. Commit to main branch.
3. Open admin/config.yml on GitHub and replace REPLACE_WITH_GITHUB_USERNAME with your real GitHub username. Commit.
4. In Netlify: Add new project > Import an existing project > GitHub > select vybz-media-site.
   Build command: leave blank. Publish directory: . (a single dot). Deploy.
5. Set up GitHub OAuth for the CMS: GitHub Settings > Developer settings > OAuth Apps > New OAuth App.
   Homepage URL: https://YOUR-SITE.netlify.app
   Authorization callback URL: https://api.netlify.com/auth/done
   Copy the Client ID and generate a Client Secret.
6. Netlify project > Project configuration > Security > OAuth > Install provider > GitHub.
   Enter the GitHub OAuth Client ID and Client Secret, save. Never put the secret into site files.
7. Visit https://YOUR-SITE.netlify.app/admin/ and choose Login with GitHub.
8. Open Website Editor > Homepage, Portfolio & Services. Edit fields, upload images, click Publish.
   Changes commit to GitHub and Netlify automatically deploys them, usually in a short time.

IMPORTANT
- Your old manually uploaded Netlify deployment does NOT automatically connect to GitHub.
  Import as a Git-based site; it may initially get a different Netlify URL. You can migrate your custom domain later.
- The CMS requires a GitHub repository and OAuth; a ZIP drag-and-drop alone cannot save edits.
- Project images should be JPG, PNG or WebP and optimised for the web.
- HTML formatting in heading fields is supported only for <br>, <em>, and <span class="accent"> / <span class="outline">.
- If you only want to edit text locally, change content/site.json and redeploy.
- The live site uses /content/site.json; opening index.html with file:// will show fallback content.
- To preview locally run: python3 -m http.server 8000 inside this folder, then open http://localhost:8000
- Netlify/GitHub free-tier usage limits apply. This is a free-stack setup, not a guarantee of unlimited free usage.
- Git Gateway is deprecated for new configurations; this uses GitHub OAuth instead.
