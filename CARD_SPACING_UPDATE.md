# 📐 日记卡片留白调整说明

## 🎯 调整目标

让日记页面的卡片内容文字与卡片的上下边缘保持相同的留白，提供更一致和美观的视觉效果。

## 🔧 调整内容

### 1. 日记列表卡片 (diary-archive__item)

**调整前的问题：**
- 卡片有 `padding: 2rem`
- 但内部元素（标题、元信息、摘要、页脚）都有各自的 `margin`
- 导致留白不均匀，视觉上不协调

**调整后的改进：**
- 重置所有内部元素的 `margin-top` 和 `margin-bottom`
- 让卡片的 `padding: 2rem` 统一控制所有留白
- 保持元素间的适当间距（通过 `margin-bottom` 控制）

### 2. 单篇日记内容 (diary-post__content)

**调整内容：**
- 添加 `> *:first-child { margin-top: 0; }` 规则
- 确保第一个内容元素与容器顶部对齐
- 让容器的 `padding` 控制顶部留白

### 3. 相关日记卡片 (diary-post__related-item)

**调整内容：**
- 重置所有内部元素的 `margin-top` 和 `margin-bottom`
- 确保与主卡片保持一致的留白风格

## 📏 具体变化

### 日记列表卡片
```scss
.diary-archive__item {
  padding: 2rem; // 统一控制所有留白
  
  &-content {
    .diary-archive__item-header {
      margin-bottom: 0; // 重置
      
      .diary-archive__item-title {
        margin-top: 0; // 重置顶部留白
        margin-bottom: 0.5rem; // 保持与元信息的间距
      }
      
      .diary-archive__item-meta {
        margin-bottom: 1rem; // 保持与摘要的间距
      }
    }
    
    .diary-archive__item-excerpt {
      margin-top: 0; // 重置顶部留白
      margin-bottom: 1rem; // 保持与页脚的间距
    }
    
    .diary-archive__item-footer {
      margin-top: 0; // 重置顶部留白
      margin-bottom: 0; // 重置底部留白
    }
  }
}
```

### 单篇日记内容
```scss
.diary-post__content {
  // 重置第一个元素的margin-top，让容器padding控制顶部留白
  > *:first-child {
    margin-top: 0;
  }
}
```

## 🎨 视觉效果

### 调整前 ❌
- 卡片内容与边缘留白不一致
- 顶部和底部留白不对称
- 视觉上不够整洁

### 调整后 ✅
- 卡片内容与边缘留白完全一致
- 上下留白对称，视觉平衡
- 整体更加整洁美观

## 📱 响应式支持

所有调整都保持了响应式设计：
- 桌面端：`padding: 2rem`
- 移动端：`padding: 1.5rem`（在媒体查询中已定义）

## 🚀 测试建议

1. **启动Jekyll服务器**：
   ```bash
   bundle exec jekyll serve
   ```

2. **检查效果**：
   - 访问 `/diary/` 页面查看列表卡片
   - 点击任意日记查看单篇内容
   - 检查相关日记卡片
   - 在不同设备上测试响应式效果

3. **验证留白**：
   - 卡片内容与边缘的留白应该完全一致
   - 上下留白应该对称
   - 元素间的间距应该合理

---

现在你的日记卡片有了更加一致和美观的留白效果！🎉
