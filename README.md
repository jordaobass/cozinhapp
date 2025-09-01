# 🍳 Cozinhapp - Receitas Personalizadas com Seus Ingredientes

> **Transforme os ingredientes que você tem em casa em receitas deliciosas!**

Uma reimaginação moderna em **Next.js 15** da ideia original de [Deleon Simoni](https://github.com/orgs/nexttag/people/deleonsimoni). Projeto original: [CozinhApp](https://github.com/deleonsimoni/CozinhApp).

**Apoiado por [Nexxtag](https://github.com/nexttag)** 🚀

---

## ✨ **O que é o Cozinhapp?**

O **Cozinhapp** é uma aplicação web inteligente que ajuda você a descobrir receitas baseadas nos ingredientes que você possui. Simplesmente selecione os ingredientes disponíveis e descubra centenas de receitas personalizadas!

### 🎯 **Principais Funcionalidades**

- 🔍 **Busca Inteligente**: Encontre receitas usando seus ingredientes disponíveis
- 🥗 **680+ Receitas**: Base completa com pratos brasileiros e internacionais  
- 🎨 **Interface Moderna**: Design responsivo com tema claro/escuro
- ⚡ **Performance Otimizada**: Lazy loading e cache inteligente
- 📱 **Mobile First**: Funciona perfeitamente em qualquer dispositivo
- 🔤 **Busca Sem Acentos**: Encontre receitas mesmo digitando sem acentuação

---

## 🚀 **Tecnologias Utilizadas**

### **Core Stack**
- ⚡ **[Next.js 15](https://nextjs.org)** - Framework React com Turbopack
- ⚛️ **React 18** - Biblioteca UI moderna  
- 🎨 **Tailwind CSS** - Styling utilitário
- 📝 **TypeScript** - Type safety

### **UI & UX**
- 🎭 **Framer Motion** - Animações fluidas
- 🌗 **next-themes** - Sistema de temas
- 🎯 **Radix UI** - Componentes acessíveis
- 🔥 **Lucide React** - Ícones modernos


---

## 🎨 **Screenshots**

### 🏠 **Tela Inicial**
Interface limpa com busca de ingredientes

### 🔍 **Busca de Receitas** 
Sistema inteligente de filtragem

### 📄 **Detalhes da Receita**
Instruções completas com informações nutricionais

---

## 🚀 **Quick Start**

### **1. Clone o repositório**
```bash
git clone https://github.com/nexttag/cozinhapp.git
cd cozinhapp
```

### **2. Instale as dependências**
```bash
npm install
```

### **3. Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

### **4. Abra no navegador**
Acesse [http://localhost:3000](http://localhost:3000) 

---

## 📋 **Scripts Disponíveis**

```bash
# Desenvolvimento (com Turbopack)
npm run dev

# Build de produção
npm run build  

# Iniciar em produção
npm run start

# Linting
npm run lint
```

---

## 🏗️ **Estrutura do Projeto**

```
📁 cozinhapp/
├── 📁 src/
│   ├── 📁 app/           # App Router (Next.js 13+)
│   ├── 📁 components/    # Componentes reutilizáveis
│   └── 📁 utils/         # Utilitários e helpers
├── 📁 public/
│   ├── 📁 data/          # Base de dados JSON
│   │   ├── alimentos.json     # 98 ingredientes
│   │   └── receitas.json      # 680+ receitas
│   └── 📁 images/        # Assets estáticos
└── 📄 package.json
```

---

## 🔧 **Principais Componentes**

### **🔍 AutocompleteInput**
- Sistema de busca com autocomplete
- Suporte a busca sem acentos
- Animações com Framer Motion

### **🃏 ListaCards** 
- Exibição otimizada de receitas
- Lazy loading sob demanda  
- Cache inteligente de dados

### **📱 Header**
- Navegação responsiva
- Alternador de tema claro/escuro
- Logo clicável

---

## 📊 **Performance**

### **⚡ Métricas de Desenvolvimento**
- **Startup**: < 1 segundo (Turbopack)
- **Hot Reload**: ~100ms (Next.js 15)
- **Build Time**: Otimizado

### **🎯 Otimizações Implementadas**
- **Lazy Loading**: Receitas carregam apenas quando necessário
- **Smart Caching**: Cache em memória durante a sessão
- **Code Splitting**: Bundles otimizados
- **Image Optimization**: Next.js built-in

---


## 🤝 **Contribuindo**

Contribuições são bem-vindas! 

### **Como contribuir:**
1. 🍴 Fork o projeto
2. 🌿 Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push para a branch (`git push origin feature/AmazingFeature`)
5. 🔃 Abra um Pull Request

---

## 👨‍💻 **Créditos**

### **Desenvolvimento Atual**
- **Nexxtag Team** - Implementação Next.js 15

### **Conceito Original**  
- **[Deleon Simoni](https://github.com/deleonsimoni)** - Ideia e conceito inicial

--

## 📞 **Contato**

- 🌐 **Website**: [Cozinhapp](https://cozinhapp.com)
- 📧 **Email**: contato@nexttag.com  
- 🐙 **GitHub**: [@nexttag](https://github.com/nexttag)

---

<div align="center">

**Feito com ❤️ pela equipe [Nexxtag](https://github.com/nexttag)**

⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐

</div>
