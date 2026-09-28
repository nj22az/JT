# Johansson Town (JT)

The standalone migration is prepared from `nj22az/nj22az.github.io` at
`49c5d845128c49f73dd81b07778ad5c6f2a990fc`.

**Publication is blocked; the new site is not live yet.** On 28 September 2026,
GitHub stopped the import before any build steps ran with this annotation:

> The job was not started because your account is locked due to a billing issue.

[Import run and annotation](https://github.com/nj22az/JT/actions/runs/36451478795)

The existing town is still available at https://nj22az.github.io/johansson-town/.
The intended standalone address is https://nj22az.github.io/JT/.

## Prepared migration

- Pinned import of Johansson Town and Thuan’s Storage, with relative navigation
  and the existing save keys preserved.
- Local assets, creator, editable sources and component licence records.
- Rebuilt runtime and a Pages artifact checker: 837 local references passed.
- Three runtime checks, one saved-visit migration check and six storage checks
  passed locally. Existing broad-suite failures are documented in the migration.
- Reproducible overrides in `migration/overrides.json`; the import produces the
  full repository and replaces this temporary status page.

## Finish publication

1. Resolve the GitHub account lock shown above.
2. In **Settings → Pages**, choose **GitHub Actions**.
3. Re-run **Import existing Johansson Town**. It copies the pinned files,
   applies the tested changes, builds, validates and commits the complete game.
4. Its successful completion starts **Publish Johansson Town**, which deploys
   the site. Later pushes to `main` publish directly from this repository.

The import checks that the town is not already present and uses a normal
fast-forward push. It will not overwrite a separately imported game.
