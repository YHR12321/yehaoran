/**
 * Tab 选项卡通用组件
 * 用法：
 *   new TabSwitcher({
 *     tabs:   '.tab-item',        // 选项卡按钮的选择器
 *     panels: '.tab-panel',       // 对应内容面板的选择器
 *     activeClass: 'active',      // 选中态类名
 *     defaultIndex: 0             // 默认选中索引
 *   });
 */
class TabSwitcher {
    constructor(options) {
        this.tabs       = document.querySelectorAll(options.tabs);
        this.panels     = document.querySelectorAll(options.panels);
        this.activeClass = options.activeClass || 'active';
        this.defaultIdx = options.defaultIndex ?? 0;

        if (this.tabs.length === 0) return;

        this.bindEvents();
        this.switchTo(this.defaultIdx);
    }

    /** 给每个选项卡按钮绑定点击事件 */
    bindEvents() {
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.switchTo(index);
            });
        });
    }

    /** 切换到指定索引 */
    switchTo(index) {
        // 1. 先清除所有选项卡的选中状态
        this.tabs.forEach(tab => tab.classList.remove(this.activeClass));
        this.panels.forEach(panel => panel.classList.remove(this.activeClass));

        // 2. 再设置当前元素的选中状态
        if (this.tabs[index])   this.tabs[index].classList.add(this.activeClass);
        if (this.panels[index]) this.panels[index].classList.add(this.activeClass);
    }
}

// 挂载到 window，让外部 HTML 可以直接 new
window.TabSwitcher = TabSwitcher;
