# 📋 GitHub Actions 工作流说明

这个文档说明了 ReverieGlow 整合包的自动构建和发布流程。

## 🔄 工作流概述

本项目使用 GitHub Actions 实现全自动的整合包构建和发布流程，无需手动干预即可完成版本管理、文件处理和发行版创建。

## ⚙️ 工作流特性

### 🚀 自动触发
- 每次推送到 `main` 分支时自动执行
- Pull Request 到 `main` 分支时也会执行（用于测试）

### 📦 资源包处理
- 自动将 `./resourcepacks/Reglow汉化补充包` 文件夹打包为 ZIP 文件
- 删除原有文件夹，保持目录整洁
- 自动更新 `options.txt` 中的资源包引用路径

### 🗑️ 文件清理
- 根据 `pub.json5` 文件自动删除指定的文件和文件夹
- 支持配置文件中的数组格式

### 🏷️ 版本管理
- 根据最新提交消息的标题自动生成新的版本标识符
- 使用 `pub.json5` 中的模板，将 `{}` 替换为提交标题
- 自动重命名相关文件：
  - `{旧版本}.jar` → `{新版本}.jar`
  - `{旧版本}.json` → `{新版本}.json`
- 更新 JSON 文件中的 `id` 字段

### 📋 构建产物和发布
- 自动打包整个项目为发布用的 ZIP 文件
- 生成详细的构建信息文件
- 自动创建 GitHub 发行版草案
- 将打包文件作为发行版的附件上传
- 自动上传构建产物到 GitHub Actions Artifacts

## 📁 配置文件说明

### `pub.json5`
统一的发布配置文件，使用 JSON5 格式支持注释：

```json5
{
  // Minecraft 整合包发布配置文件
  // 支持 JSON5 格式，允许注释和更灵活的语法
  
  // 版本重命名模板，使用 {} 作为提交标题的占位符
  "rename": "ReverieGlow_{}",
  
  // 当前版本标识符
  "currentVersion": "ReverieGlow",
  
  // 发行版名称模板，使用 {} 作为提交标题的占位符
  "releaseName": "Reglow {}",
  
  // 需要删除的文件和文件夹列表
  // 支持相对路径，以工作区根目录为基准
  "remove": [
    "resourcepacks/Midnighttiggers-FCT-Default_1.20_V6.zip",
    "resourcepacks/Quark Programmer Art.zip",
    "resourcepacks/tconjeidark.zip"
  ]
}
```

#### 配置字段说明：
- **`rename`**: 版本重命名模板，`{}` 会被替换为提交标题
- **`currentVersion`**: 当前版本标识符，构建后会自动更新
- **`releaseName`**: 发行版名称模板，`{}` 会被替换为提交标题
- **`remove`**: 需要删除的文件和文件夹数组，支持相对路径

## 🔧 工作流程详解

1. **获取提交信息**：提取最新提交的标题作为版本标识符
2. **安装依赖**：安装 jq 和 json5 工具处理配置文件
3. **读取配置文件**：解析 `pub.json5` 中的配置
4. **处理资源包**：打包 `Reglow汉化补充包` 并更新引用
5. **更新配置文件**：修改 `options.txt` 中的资源包路径
6. **删除指定文件**：根据配置删除不需要的文件
7. **重命名版本文件**：更新 `.jar` 和 `.json` 文件名
8. **更新 JSON 内容**：修改 JSON 文件中的 `id` 字段
9. **创建发布包**：将处理后的文件打包为 ZIP
10. **创建发行版草案**：自动创建 GitHub Release
11. **上传构建产物**：保存到 Actions Artifacts

## 📦 发布包内容

### ✅ 包含的文件/目录：
- **主要文件**：`{新版本}.jar`、`{新版本}.json`
- **游戏配置**：`options.txt`（已更新）
- **资源包**：`resourcepacks/`（已处理）
- **模组文件**：`mods/`
- **配置目录**：`config/`
- **其他游戏文件**：`kubejs/`、`defaultconfigs/`、`local/` 等
- **系统文件**：`.dll`、`.toml`、`.ini` 等
- **构建信息**：`build-info.txt`
- **项目说明**：`README.md`

### ❌ 排除的文件/目录：
- **`.github/`** - 工作流目录
- **`pub.json5`** - 构建配置文件
- **`.git`** 相关文件

## ⚠️ 重要说明

### 🛡️ 不影响远程仓库
当前工作流配置为**无提交模式**：
- ✅ 所有处理都在构建环境中进行
- ✅ 不会提交任何更改到源代码仓库
- ✅ 保持源代码仓库的清洁状态
- ✅ 只创建发行版，不修改仓库内容

## 🚀 使用方法

1. **配置文件**：确保 `pub.json5` 配置正确
2. **提交代码**：推送到 `main` 分支触发构建
3. **查看进度**：在 Actions 页面监控构建状态
4. **获取产物**：
   - 在 Releases 页面查看发行版草案
   - 在 Actions 页面下载构建产物
5. **发布版本**：编辑发行版草案并正式发布

## 🐛 故障排除

### 常见问题

**Q: 构建失败，提示找不到 pub.json5？**
A: 确保 `pub.json5` 文件在仓库根目录且格式正确。

**Q: 版本文件重命名失败？**
A: 检查 `currentVersion` 配置是否与实际文件名匹配。

**Q: 发行版创建失败？**
A: 确保仓库有创建 Release 的权限，检查 GitHub Token 设置。

**Q: 资源包处理失败？**
A: 确认 `resourcepacks/Reglow汉化补充包` 目录存在且不为空。

### 日志查看

1. 前往仓库的 **Actions** 页面
2. 点击对应的工作流运行
3. 查看各个步骤的详细日志
4. 根据错误信息进行故障排除

## 🔧 自定义配置

### 修改版本命名规则
编辑 `pub.json5` 中的 `rename` 字段：
```json5
"rename": "YourModpack_{}"
```

### 修改发行版名称
编辑 `pub.json5` 中的 `releaseName` 字段：
```json5
"releaseName": "Your Modpack {}"
```

### 添加删除文件
在 `pub.json5` 的 `remove` 数组中添加路径：
```json5
"remove": [
  "path/to/file.txt",
  "path/to/directory/"
]
```

## 📈 版本历史

工作流会自动管理版本历史，每次构建都会：
- 创建带时间戳的发布包
- 生成详细的构建信息
- 保留在 GitHub Releases 中

---

**💡 提示**：如需修改工作流行为，请编辑 `.github/workflows/build-and-publish.yml` 文件。
