// 全域變數
let availableLocations = [];
let currentLocation = '';
let imageCache = new Map();

// DOM 元素
const locationNav = document.getElementById('location-nav');
const beforeImage = document.getElementById('before-image');
const afterImage = document.getElementById('after-image');
const errorMessage = document.getElementById('error-message');
const noImagesMessage = document.getElementById('no-images-message');
const comparisonSlider = document.getElementById('comparison-slider');

// 初始化應用程式
document.addEventListener('DOMContentLoaded', function() {
    console.log('應用程式初始化中...');
    initializeApp();
});

// 初始化應用程式
async function initializeApp() {
    try {
        // 掃描可用的圖片位置
        await scanAvailableLocations();
        
        if (availableLocations.length === 0) {
            showNoImagesMessage();
            return;
        }
        
        // 建立導覽列
        createNavigationBar();
        
        // 載入預設位置（客廳，如果不存在則載入第一個可用位置）
        const defaultLocation = availableLocations.includes('客廳') ? '客廳' : availableLocations[0];
        await loadLocation(defaultLocation);
        
        console.log('應用程式初始化完成');
    } catch (error) {
        console.error('初始化失敗:', error);
        showErrorMessage();
    }
}

// 掃描可用的圖片位置
async function scanAvailableLocations() {
    // 由於瀏覽器安全限制，無法直接讀取檔案系統
    // 我們使用預定義的位置列表，並檢查圖片是否存在
    const potentialLocations = ['大門', '客廳', '客餐廳', '餐廳', '廚房', '臥房', '書房', '衛浴I', '衛浴II', '浴室', '前陽台', '後陽台'];
    
    availableLocations = [];
    
    for (const location of potentialLocations) {
        const hasValidPair = await checkImagePairExists(location);
        if (hasValidPair) {
            availableLocations.push(location);
        }
    }
    
    console.log('找到的可用位置:', availableLocations);
}

// 檢查圖片對是否存在
async function checkImagePairExists(location) {
    try {
        // 先嘗試 .jpg 格式，再嘗試 .png 格式
        const formats = ['jpg','png'];
        
        for (const format of formats) {
            const beforeSrc = `images/${location}-1.${format}`;
            const afterSrc = `images/${location}-2.${format}`;
            
            const beforeExists = await imageExists(beforeSrc);
            const afterExists = await imageExists(afterSrc);
            
            if (beforeExists && afterExists) {
                // 儲存找到的格式供後續使用
                if (!window.imageFormats) window.imageFormats = {};
                window.imageFormats[location] = format;
                return true;
            }
        }
        
        return false;
    } catch (error) {
        console.log(`檢查位置 ${location} 時發生錯誤:`, error);
        return false;
    }
}

// 檢查圖片是否存在
function imageExists(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

// 建立導覽列
function createNavigationBar() {
    locationNav.innerHTML = '';
    
    availableLocations.forEach(location => {
        const button = document.createElement('button');
        button.textContent = location;
        button.addEventListener('click', () => loadLocation(location));
        locationNav.appendChild(button);
    });
}

// 載入指定位置的圖片
async function loadLocation(location) {
    try {
        hideMessages();
        
        // 取得該位置的圖片格式
        const format = window.imageFormats ? window.imageFormats[location] : 'jpg';
        const beforeSrc = `images/${location}-1.${format}`;
        const afterSrc = `images/${location}-2.${format}`;
        
        // 預載入圖片
        const [beforeImg, afterImg] = await Promise.all([
            preloadImage(beforeSrc),
            preloadImage(afterSrc)
        ]);
        
        // 設定圖片來源
        beforeImage.src = beforeSrc;
        afterImage.src = afterSrc;
        
        // 偵測圖片方向並調整容器
        detectImageOrientation(beforeImg);
        
        // 更新當前位置
        currentLocation = location;
        
        // 更新導覽列狀態
        updateNavigationState(location);
        
        // 重置滑桿位置
        resetSlider();
        
        console.log(`已載入位置: ${location}`);
        
    } catch (error) {
        console.error(`載入位置 ${location} 失敗:`, error);
        showErrorMessage();
    }
}

// 偵測圖片方向並調整容器樣式
function detectImageOrientation(img) {
    const imageWrapper = document.querySelector('.image-wrapper');
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    
    // 移除現有的方向類別
    imageWrapper.classList.remove('portrait', 'landscape');
    
    // 根據寬高比判斷方向
    if (aspectRatio > 1) {
        // 橫幅圖片 (寬 > 高)
        imageWrapper.classList.add('landscape');
        console.log('偵測到橫幅圖片，寬高比:', aspectRatio.toFixed(2));
    } else {
        // 直幅圖片 (高 >= 寬)
        imageWrapper.classList.add('portrait');
        console.log('偵測到直幅圖片，寬高比:', aspectRatio.toFixed(2));
    }
}

// 預載入圖片
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        if (imageCache.has(src)) {
            resolve(imageCache.get(src));
            return;
        }
        
        const img = new Image();
        img.onload = () => {
            imageCache.set(src, img);
            resolve(img);
        };
        img.onerror = () => reject(new Error(`無法載入圖片: ${src}`));
        img.src = src;
    });
}

// 更新導覽列狀態
function updateNavigationState(activeLocation) {
    const buttons = locationNav.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent === activeLocation) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// 重置滑桿位置
function resetSlider() {
    comparisonSlider.value = 50;
    updateSliderPosition(50);
}

// 更新滑桿位置
function updateSliderPosition(value) {
    const percentage = value;
    afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    
    // 更新滑桿按鈕位置
    const sliderButton = document.querySelector('.slider-button');
    if (sliderButton) {
        sliderButton.style.left = `${percentage}%`;
    }
}

// 顯示錯誤訊息
function showErrorMessage() {
    errorMessage.style.display = 'block';
    noImagesMessage.style.display = 'none';
}

// 顯示無圖片訊息
function showNoImagesMessage() {
    noImagesMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

// 隱藏所有訊息
function hideMessages() {
    errorMessage.style.display = 'none';
    noImagesMessage.style.display = 'none';
}

// 錯誤處理
window.addEventListener('error', function(event) {
    console.error('全域錯誤:', event.error);
    showErrorMessage();
});

// 圖片載入錯誤處理
beforeImage.addEventListener('error', function() {
    console.error('Before 圖片載入失敗');
    showErrorMessage();
});

afterImage.addEventListener('error', function() {
    console.error('After 圖片載入失敗');
    showErrorMessage();
});

