const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, 'public', 'sw.js');

if (fs.existsSync(swPath)) {
    let content = fs.readFileSync(swPath, 'utf8');

    // Fix the _ref.apply issue by replacing it with a proper implementation
    // The function should just pass through the response
    content = content.replace(
        /\{cacheWillUpdate:function\(e\)\{return _ref\.apply\(this,arguments\)\}\}/g,
        ''  // Remove the problematic plugin
    );

    // Clean up empty plugins arrays
    content = content.replace(/plugins:\[\]/g, 'plugins:[]');

    fs.writeFileSync(swPath, content, 'utf8');
    console.log('✓ Fixed service worker _ref issue');
} else {
    console.log('⚠ Service worker not found at:', swPath);
}
