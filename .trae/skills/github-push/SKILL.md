---
name: github-push
description: Commit and push the current project to GitHub. Use when the user asks to commit, push, deploy, or submit code to GitHub. Do not use for pull, clone, or branch operations.
---

# GitHub Push

Commit all changes in the current workspace and push to the remote repository using SSH authentication.

## Environment Constraints (Critical)

This machine has two network limitations that must be handled:

1. **hosts hijack**: `C:\Windows\System32\drivers\etc\hosts` redirects `github.com` → `127.0.0.1`. Normal SSH to `github.com:22` fails.
2. **Port 22 blocked**: Outbound SSH on port 22 is firewalled.

**Solution**: Use `ssh.github.com:443` (GitHub's SSH-over-HTTPS endpoint).
- remote URL: `ssh://git@ssh.github.com/YHR12321/yehaoran.git`
- core.sshCommand: must specify `-p 443` and `-i <key-path>`

## Target

- Remote URL: `ssh://git@ssh.github.com/YHR12321/yehaoran.git`
- SSH key: `C:/Users/DELL/.ssh/id_ed25519` (ed25519, public key registered with GitHub)
- Do NOT use `git@github.com:...` — hosts file blocks it.
- Do NOT use port 22 — firewall blocks it.

## Steps

1. **Check if Git is initialized.** Run `git rev-parse --is-inside-work-tree` in the workspace root. If it fails, run `git init`.

2. **Ensure remote and SSH command are configured** (run all three if any are missing):
   ```
   git remote set-url origin ssh://git@ssh.github.com/YHR12321/yehaoran.git
   git config core.sshCommand "ssh -p 443 -i C:/Users/DELL/.ssh/id_ed25519 -o StrictHostKeyChecking=accept-new"
   git config user.name "YHR12321"
   git config user.email "YHR12321@users.noreply.github.com"
   ```

3. **Stage all changes:**
   ```
   git -C <workspace-root> add -A
   ```

4. **Commit.** If the user provides a message, use it. Otherwise:
   ```
   git -C <workspace-root> commit -m "Update project"
   ```
   If there are no changes to commit, skip to step 5.

5. **Push.** Determine the current branch and push:
   ```
   $branch = git -C <workspace-root> branch --show-current
   git -C <workspace-root> push -u origin $branch
   ```

6. **Handle rejection.** If the remote has content and push is rejected (non-fast-forward), ask the user whether to force push or pull first. Never force push by default.

## Notes

- Run all commands with `git -C <workspace-root>` to ensure correct working directory.
- Never commit `.trae/`, node_modules/, or other local tooling directories unless explicitly requested.
- After push succeeds, report the commit hash and pushed branch.
- If SSH fails, verify `git config --get core.sshCommand` returns the full ssh command with `-p 443` and correct `-i` path.
