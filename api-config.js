/**
 * การตั้งค่า API วงล้อ
 * - ใส่ WHEEL_API_BASE เป็น URL จาก Deploy Web App ของโปรเจกต์ที่วางโค้ดจาก backend-apps-script/Code.gs
 * - ถ้าไม่ใส่ (ค่าว่าง) จะใช้ localStorage ในเครื่องนี้เท่านั้น
 *
 * ข้อสำคัญถ้าเห็น "เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ":
 * 1. ต้องเปิดเว็บจาก https:// (เช่น GitHub Pages) ไม่ใช่เปิดไฟล์จาก file://
 * 2. ใน Apps Script: Deploy > Deploy as web app > Who has access: ต้องเป็น "Anyone" หรือ "Anyone, even anonymous"
 * 3. ต้องใช้โค้ดจากโฟลเดอร์ backend-apps-script/Code.gs ในโปรเจกต์ Apps Script นั้น (มี action=list, validate, use, create ฯลฯ)
 */
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1475856758684782798/0RpyshGBDLf8ASncUday0Uiu7-ePfw9UNnkqNxvDI0xAiTIwJRuiBmMv0p_ZrAVP0jZV';

const items = [
            { name: 'Netflix 7 Day', rate: 0, color: '#4CAF50' },
            { name: 'Netflix 1 Day', rate: 3, color: '#8BC34A' },
            { name: 'Netflix 3 Day', rate: 1, color: '#FFC107' },
            { name: 'ส่วนลด 10%', rate: 1, color: '#FF9800' },
            { name: 'ส่วนลด 5%', rate: 3, color: '#2196F3' },
            { name: 'ส่วนลด 20%', rate: 0, color: '#4CAF50' },
            { name: 'MISS', rate: 47, color: '#f44336' }
        ];

function sendDiscordWebhook(prize, code, dateStr, timeStr, spinsLeft) {
    if (!DISCORD_WEBHOOK_URL || !DISCORD_WEBHOOK_URL.trim()) return;
    var now = new Date();
    var spinsText = (spinsLeft !== undefined && spinsLeft !== null) ? String(spinsLeft) + ' ครั้ง' : '-';
    var payload = {
        embeds: [{
            title: '🎡 ผลการสุ่มวงล้อ',
            color: 0xC41E3A,
            fields: [
                { name: '🔑 โค้ดที่ใช้', value: code || '-', inline: true },
                { name: '🎁 รางวัลที่ได้', value: prize, inline: true },
                { name: '🎫 สิทธิ์คงเหลือ', value: spinsText, inline: true },
                { name: '📅 วันที่', value: dateStr, inline: false },
                { name: '🕐 เวลา', value: timeStr, inline: true },
                { name: '⏱ เวลา (ISO)', value: now.toISOString(), inline: false }
            ],
            footer: { text: 'วงล้อสุ่มรางวัล · JOKEMOO' },
            timestamp: now.toISOString()
        }]
    };
    fetch(DISCORD_WEBHOOK_URL.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).catch(function() {});
}

(function () {
    'use strict';
    // URL ต้องลงท้ายด้วย /exec (จาก Deploy as web app)
    window.WHEEL_API_BASE = 'https://script.google.com/macros/s/AKfycby4HdNu20AJz-3JdpJP1v1-xF1_fqVRkifSZwkly4PTzuq9A978T-UjMJNAZg06RIo3eA/exec';
    window.LINK_CREATE_CODE = 'https://jokemoomovieluckwheel.github.io/codejoke/';
})();

