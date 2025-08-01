// 滑桿功能模組
class BeforeAfterSlider {
    constructor() {
        this.slider = document.getElementById('comparison-slider');
        this.afterImage = document.getElementById('after-image');
        this.sliderButton = document.querySelector('.slider-button');
        this.imageWrapper = document.querySelector('.image-wrapper');
        
        this.isDragging = false;
        this.startX = 0;
        this.currentValue = 50;
        
        this.init();
    }
    
    init() {
        if (!this.slider || !this.afterImage) {
            console.error('滑桿元素未找到');
            return;
        }
        
        // 綁定滑桿事件
        this.bindSliderEvents();
        
        // 綁定觸控事件
        this.bindTouchEvents();
        
        // 綁定鍵盤事件
        this.bindKeyboardEvents();
        
        console.log('滑桿功能初始化完成');
    }
    
    // 綁定滑桿事件
    bindSliderEvents() {
        this.slider.addEventListener('input', (e) => {
            this.updateSliderPosition(e.target.value);
        });
        
        this.slider.addEventListener('change', (e) => {
            this.updateSliderPosition(e.target.value);
        });
    }
    
    // 綁定觸控事件
    bindTouchEvents() {
        // 滑鼠事件
        this.imageWrapper.addEventListener('mousedown', (e) => {
            this.startDrag(e);
        });
        
        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                this.handleDrag(e);
            }
        });
        
        document.addEventListener('mouseup', () => {
            this.endDrag();
        });
        
        // 觸控事件
        this.imageWrapper.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrag(e.touches[0]);
        });
        
        document.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                e.preventDefault();
                this.handleDrag(e.touches[0]);
            }
        });
        
        document.addEventListener('touchend', () => {
            this.endDrag();
        });
    }
    
    // 綁定鍵盤事件
    bindKeyboardEvents() {
        this.slider.addEventListener('keydown', (e) => {
            let newValue = this.currentValue;
            
            switch(e.key) {
                case 'ArrowLeft':
                    newValue = Math.max(0, this.currentValue - 5);
                    break;
                case 'ArrowRight':
                    newValue = Math.min(100, this.currentValue + 5);
                    break;
                case 'Home':
                    newValue = 0;
                    break;
                case 'End':
                    newValue = 100;
                    break;
                default:
                    return;
            }
            
            e.preventDefault();
            this.slider.value = newValue;
            this.updateSliderPosition(newValue);
        });
    }
    
    // 開始拖拽
    startDrag(event) {
        this.isDragging = true;
        this.startX = event.clientX;
        this.imageWrapper.style.cursor = 'ew-resize';
        
        // 防止文字選取
        document.body.style.userSelect = 'none';
        
        // 立即更新位置
        this.handleDrag(event);
    }
    
    // 處理拖拽
    handleDrag(event) {
        if (!this.isDragging) return;
        
        const rect = this.imageWrapper.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        this.slider.value = percentage;
        this.updateSliderPosition(percentage);
    }
    
    // 結束拖拽
    endDrag() {
        this.isDragging = false;
        this.imageWrapper.style.cursor = '';
        document.body.style.userSelect = '';
    }
    
    // 更新滑桿位置
    updateSliderPosition(value) {
        this.currentValue = parseFloat(value);
        
        // 更新圖片遮罩
        this.afterImage.style.clipPath = `inset(0 ${100 - this.currentValue}% 0 0)`;
        
        // 更新滑桿按鈕位置
        if (this.sliderButton) {
            this.sliderButton.style.left = `${this.currentValue}%`;
        }
        
        // 更新滑桿值
        this.slider.value = this.currentValue;
        
        // 觸發自定義事件
        this.dispatchSliderEvent();
    }
    
    // 重置滑桿到中間位置
    reset() {
        this.updateSliderPosition(50);
    }
    
    // 設定滑桿值
    setValue(value) {
        const clampedValue = Math.max(0, Math.min(100, value));
        this.updateSliderPosition(clampedValue);
    }
    
    // 取得當前滑桿值
    getValue() {
        return this.currentValue;
    }
    
    // 觸發自定義事件
    dispatchSliderEvent() {
        const event = new CustomEvent('sliderchange', {
            detail: {
                value: this.currentValue,
                percentage: this.currentValue
            }
        });
        
        this.slider.dispatchEvent(event);
    }
    
    // 啟用滑桿
    enable() {
        this.slider.disabled = false;
        this.imageWrapper.style.pointerEvents = 'auto';
    }
    
    // 停用滑桿
    disable() {
        this.slider.disabled = true;
        this.imageWrapper.style.pointerEvents = 'none';
    }
}

// 全域滑桿實例
let sliderInstance = null;

// 初始化滑桿
document.addEventListener('DOMContentLoaded', function() {
    sliderInstance = new BeforeAfterSlider();
    
    // 監聽自定義滑桿事件
    document.getElementById('comparison-slider').addEventListener('sliderchange', function(e) {
        console.log('滑桿值變更:', e.detail.value);
    });
});

// 全域函數：更新滑桿位置（供 main.js 使用）
function updateSliderPosition(value) {
    if (sliderInstance) {
        sliderInstance.updateSliderPosition(value);
    }
}

// 全域函數：重置滑桿（供 main.js 使用）
function resetSlider() {
    if (sliderInstance) {
        sliderInstance.reset();
    }
}

// 全域函數：設定滑桿值（供 main.js 使用）
function setSliderValue(value) {
    if (sliderInstance) {
        sliderInstance.setValue(value);
    }
}

// 全域函數：取得滑桿值
function getSliderValue() {
    return sliderInstance ? sliderInstance.getValue() : 50;
}

