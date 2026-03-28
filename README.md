# 👾 OpenMonster — Sovereign AI Architect

**Build anything by chatting.**

OpenMonster is an AI architect you run on your own devices. It listens, understands, and **actually builds** — websites, apps, APIs, or full projects. Just describe what you want, and OpenMonster creates it.

No cloud dependency. No subscriptions. Just you, your machine, and an AI that does the work.

---

## ✨ What Makes OpenMonster Different

| Feature | OpenMonster |
|---------|-------------|
| **Actually builds** | Creates real files, not just text responses |
| **Local-first** | Runs entirely on your hardware |
| **Your own AI** | Uses your custom NanoPi model |
| **Full autonomy** | One command from idea to deployment |
| **Privacy guaranteed** | No data leaves your machine |

---

## 🚀 Quick Start

**Requirements:** Node 24+ (or Node 22.16+)

```bash
# Install
npm install -g openmonster@latest

# Start building
monster build "a personal portfolio website"

# Or have a conversation
monster chat
```

That's it. OpenMonster creates your project, writes the code, and shows you the result.

---

## 📋 Commands

| Command | What it does |
|---------|--------------|
| `monster chat` | Start a conversation. Tell me what you want to build. |
| `monster build "description"` | Create a working project from your idea. |
| `monster omega "goal"` | Complete development cycle — from planning to deployment. |
| `monster create <type> <name>` | Generate specific files or components. |
| `monster exec "command"` | Run shell commands through the assistant. |
| `monster deploy` | Deploy your project to Docker or cloud. |

---

## 💡 Examples

```bash
# Create a website
monster build "landing page for my coffee shop"

# Build a complete app
monster omega "todo app with user authentication and tests"

# Generate a component
monster create react component UserProfile

# Run commands
monster exec "npm install express"

# Deploy
monster deploy
```

---

## 🔧 How It Works

OpenMonster uses the **Aries Protocol** — a five-step process that turns your ideas into working software:

```
1. SENSE       I understand what you want to build
2. ARCHITECT   I create a development plan
3. MANIFEST    I write code to your disk
4. VALIDATE    I test everything automatically
5. EXPORT      I deploy your project
```

All powered by **NanoPi**, your local AI model running on Ollama.

---

## 🧠 Your AI, Your Rules

OpenMonster uses **your local NanoPi model**:

```bash
# Configure once
monster config set llm.provider ollama
monster config set llm.model opendev-labs/nanopi:latest

# That's it. Everything runs locally.
```

No API keys. No cloud costs. No privacy concerns.

---

## 🎯 What You Can Build

- **Websites** — landing pages, portfolios, blogs, e-commerce
- **Applications** — React, Vue, Node, Python, Go
- **APIs** — REST, GraphQL, authentication
- **Components** — reusable UI pieces, libraries
- **Full projects** — from idea to deployment

---

## 📦 Installation Options

### Global install (recommended)
```bash
npm install -g openmonster@latest
monster onboard
```

### From source
```bash
git clone https://github.com/opendev-labs/openmonster.git
cd openmonster
pnpm install
pnpm build
pnpm openmonster onboard
```

### Docker
```bash
docker run -it opendev-labs/openmonster
```

---

## 🔐 Security

OpenMonster runs entirely on your machine. By default:

- All code stays local
- No external API calls (unless you enable them)
- You control what the AI can access

For sensitive projects, use sandbox mode:
```bash
monster config set sandbox.mode true
```

---

## 🛠️ Configuration

Minimal `~/.openmonster/config.json`:

```json
{
  "llm": {
    "provider": "ollama",
    "model": "opendev-labs/nanopi:latest"
  }
}
```

[Full configuration guide →](https://openmonster.ai/docs/config)

---

## 📱 Companion Apps (Optional)

OpenMonster works great from the terminal. But you can also use:

- **Web UI** — chat interface in your browser
- **macOS app** — menu bar control
- **iOS/Android nodes** — voice input on mobile

[App setup guide →](https://openmonster.ai/apps)

---

## 🧪 Development Status

- **stable** — tagged releases (vYYYY.M.D)
- **beta** — prerelease versions with new features
- **dev** — latest development branch

Switch channels:
```bash
monster update --channel beta
```

---

## 🤝 Contributing

OpenMonster is open source and community-driven.

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

[Contributing guide →](https://openmonster.ai/contributing)

---

## 📄 License

MIT License — free for personal and commercial use.

---

## 🙏 Credits

Built by [opendev-labs](https://github.com/opendev-labs) and the community.

- **NanoPi** — the sovereign AI model powering OpenMonster
- **OpenClaw** — for the original assistant framework
- **Aries Protocol** — the architecture that makes autonomous building possible

---

## 🔗 Links

- [Website](https://openmonster.ai)
- [Documentation](https://openmonster.ai/docs)
- [GitHub](https://github.com/opendev-labs/openmonster)
- [Discord](https://discord.gg/openmonster)

---

**OpenMonster 👾 — Build anything by chatting.**
