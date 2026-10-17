import { pathFor } from "@/seo/routes";

// Prerendered once to dist/404.html and served for every unknown URL in any language,
// so the text is bilingual instead of depending on the URL.
const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-muted">
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-1 text-xl text-muted-foreground" lang="fr">Oups ! Page introuvable</p>
      <p className="mb-6 text-xl text-muted-foreground" lang="en">Oops! Page not found</p>
      <div className="flex items-center justify-center gap-6">
        <a href={pathFor("home", "fr")} lang="fr" className="text-primary underline hover:text-primary/90">
          Retour à l'accueil
        </a>
        <a href={pathFor("home", "en")} lang="en" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  </div>
);

export default NotFound;
