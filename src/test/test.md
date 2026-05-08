# 🚀 MUI Responsive & SX Props Quick Reference (test.md)

สรุปคีย์สำคัญสำหรับการจัดการ Layout และ Style ใน Material UI (MUI)

---

## 📏 1. Breakpoints (ระบบขนาดหน้าจอ)

MUI ใช้ระบบ **Mobile-first** (ค่าที่กำหนดในระดับเล็กจะส่งผลไปถึงระดับใหญ่)

| Key      | หน้าจอ (Pixels) | คำอธิบาย (อุปกรณ์ที่เหมาะสม)                 |
| :------- | :-------------- | :------------------------------------------- |
| **`xs`** | 0px ขึ้นไป      | มือถือขนาดเล็ก (Extra-small)                 |
| **`sm`** | 600px ขึ้นไป    | มือถือจอใหญ่ / แท็บเล็ตแนวตั้ง (Small)       |
| **`md`** | 900px ขึ้นไป    | แท็บเล็ตแนวนอน / แล็ปท็อปขนาดเล็ก (Medium)   |
| **`lg`** | 1200px ขึ้นไป   | หน้าจอคอมพิวเตอร์มาตรฐาน (Large)             |
| **`xl`** | 1536px ขึ้นไป   | หน้าจอคอมพิวเตอร์ขนาดใหญ่พิเศษ (Extra-large) |

---

## 🎨 2. SX Props Shorthands

### ↔️ 1. Margin (ระยะห่างภายนอก)

- **`m`**: Margin ทุกด้าน
- **`mt`**: Margin Top (บน)
- **`mb`**: Margin Bottom (ล่าง)
- **`ml`**: Margin Left (ซ้าย)
- **`mr`**: Margin Right (ขวา)
- **`mx`**: Margin Left & Right (แนวนอน)
- **`my`**: Margin Top & Bottom (แนวตั้ง)

### ↕️ 2. Padding (ระยะห่างภายใน)

- **`p`**: Padding ทุกด้าน
- **`pt`**: Padding Top (บน)
- **`pb`**: Padding Bottom (ล่าง)
- **`pl`**: Padding Left (ซ้าย)
- **`pr`**: Padding Right (ขวา)
- **`px`**: Padding แนวนอน
- **`py`**: Padding แนวตั้ง

### 🖼️ 3. Border (ขอบ)

- **`border`**: Border ทุกด้าน
- **`borderTop`**: Border ด้านบน
- **`borderBottom`**: Border ด้านล่าง
- **`borderLeft`**: Border ด้านซ้าย
- **`borderRight`**: Border ด้านขวา

### 🧊 4. Display & Flex (การแสดงผล)

- **`display`**: รูปแบบการแสดงผล (เช่น `block`, `inline`, `none`)
- **`flex`**: กำหนดค่า Flex ให้กับ Item
- **`flexDirection`**: ทิศทางของ Flex (`row`, `column`)
- **`alignItems`**: จัดตำแหน่งแกนรอง (เช่น `center`)
- **`justifyContent`**: จัดตำแหน่งแกนหลัก (เช่น `space-between`, `center`)

---

## 🏗️ 3. Layout Examples

### Grid System

ใช้สำหรับจัดคอลัมน์ที่ยืดหยุ่นตามหน้าจอ

```jsx
<Grid container spacing={2} justifyContent={"space-between"}>
  <Grid item xs={12} md={6}>
    {/* เนื้อหา */}
  </Grid>
</Grid>
```

### ↔️ Spacing (Margin & Padding)

- **`m`, `p`**: ทุกด้าน
- **`mt`, `pt`**: บน (Top) | **`mb`, `pb`**: ล่าง (Bottom)
- **`ml`, `pl`**: ซ้าย (Left) | **`mr`, `pr`**: ขวา (Right)
- **`mx`, `px`**: แนวนอน (X-axis)
- **`my`, `py`**: แนวตั้ง (Y-axis)

### 🖼️ Border & Shape

- **`border`**: เช่น `1` (เส้นขอบปกติ), `0` (ไม่มี)
- **`borderColor`**: เช่น `'divider'`, `'primary.main'`
- **`borderRadius`**: เช่น `1` (4px), `2` (8px), `'50%'` (วงกลม)

### 🧊 Display & Layout

- **`display`**: `flex`, `grid`, `block`, `none` (ใช้ซ่อนของ)
- **`gap`**: ระยะห่างระหว่างลูกๆ (เช่น `gap: 2`)
- **`alignItems`**: `center`, `flex-start`, `flex-end`
- **`justifyContent`**: `center`, `space-between`, `space-around`

---

## 🌈 3. Theme Colors & Typography

### 🎨 Colors (ใช้ใน sx: color หรือ bgcolor)

- `primary.main`, `secondary.main`, `error.main`, `warning.main`, `info.main`, `success.main`
- `text.primary`, `text.secondary`, `text.disabled`
- `grey[100]` ถึง `grey[900]`

### 🖋️ Typography Variants

- `h1` - `h6`: หัวข้อ
- `body1`, `body2`: เนื้อหา
- `subtitle1`, `subtitle2`: หัวข้อย่อย
- `caption`, `overline`: ตัวเล็กพิเศษ

---

## 💡 4. Pro Tips

- **Responsive Object**: `sx={{ width: { xs: '100%', md: '50%' } }}`
- **Hover State**: `sx={{ '&:hover': { bgcolor: 'primary.light' } }}`
- **Center Anything**: `<Box display="flex" justifyContent="center" alignItems="center">`
