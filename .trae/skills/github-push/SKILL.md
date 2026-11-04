---
name: github-push
description: Commit and push the current project to GitHub. Use when the user asks to commit, push, deploy, or submit code to GitHub. Do not use for pull, clone, or branch operations.
---

# GitHub Push

Commit all changes in the current workspace and push to the remote repository using SSH authentication.

## Target

- Remote SSH URL: `git@github.com:YHR12321/yehaoran.git`
- HTTPS fallback URL: `https://github.com/YHR12321/yehaoran.git`
- SSH key location: `~/.ssh/id_ed25519` (public key already registered with GitHub)

## Steps

1. **Check if Git is initialized.** Run `git rev-parse --is-inside-work-tree` in the workspace root. If it fails, run `git init`.

2. **Check remote.** Run `git remote -v`.
   - If `origin` is not set, add it with the SSH URL:
     ```
     git remote add origin git@github.com:YHR12321/yehaoran.git
     ```
   - If `origin` exists but points to HTTPS, update it to SSH:
     ```
     git remote set-url origin git@github.com:YHR12321/yehaoran.git
     ```

3. **Configure Git identity** if not already set:
   ```
   git config user.name "YHR12321"
   git config user.email "YHR12321@users.noreply.github.com"
   ```

4. **Stage all changes:**
   ```
   git add -A
   ```

5. **Commit.** If the user provides a commit message, use it. Otherwise use a descriptive message like:
   ```
   git commit -m "Update project"
   ```
   If there are no changes to commit, skip to step 6.

6. **Determine current branch name:**
   ```
   git branch --show-current
   ```
   If the branch is `master`, set upstream and push:
   ```
   git push -u origin master
   ```
   If the branch is `main`, set upstream and push:
   ```
   git push -u origin main
   ```
   Otherwise push the current branch name.

7. **Handle first-push rejection.** If the remote already has content and push is rejected with non-fast-forward, inform the user and ask whether to force push or pull first. Do not force push by default.

## Notes

- Always prefer SSH over HTTPS for the remote URL — the SSH key is already configured.
- Run all commands with `git -C <workspace-root>` to ensure correct working directory.
- Never commit `.trae/`, node_modules/, or other local tooling directories unless explicitly requested.
- After push succeeds, report the commit hash and pushed branch.
