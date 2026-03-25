// Script temporal para actualizar los editores - se puede borrar después
import fs from 'fs';

const linkEditorPath = 'c:/Users/marke/Downloads/linkmaster/components/dashboard/LinkEditor.tsx';
const productEditorPath = 'c:/Users/marke/Downloads/linkmaster/components/dashboard/ProductEditor.tsx';

// Leer LinkEditor
let linkEditor = fs.readFileSync(linkEditorPath, 'utf8');

// Reemplazar en LinkEditor
linkEditor = linkEditor.replace(
    /onChange=\{\\(e\) => onUpdate\(link\.id, 'icon', e\.target\.value\)\}/g,
    "onChange={(e) => onUpdate(link.id, { icon: e.target.value })}"
);
linkEditor = linkEditor.replace(
    /onChange=\{\\(e\) => onUpdate\(link\.id, 'title', e\.target\.value\)\}/g,
    "onChange={(e) => onUpdate(link.id, { title: e.target.value })}"
);
linkEditor = linkEditor.replace(
    /onChange=\{\\(e\) => onUpdate\(link\.id, 'active', e\.target\.checked\)\}/g,
    "onChange={(e) => onUpdate(link.id, { active: e.target.checked })}"
);
linkEditor = linkEditor.replace(
    /onChange=\{\\(e\) => onUpdate\(link\.id, 'url', e\.target\.value\)\}/g,
    "onChange={(e) => onUpdate(link.id, { url: e.target.value })}"
);

fs.writeFileSync(linkEditorPath, linkEditor);

// Leer ProductEditor  
let productEditor = fs.readFileSync(productEditorPath, 'utf8');

// Actualizar parámetros de función
productEditor = productEditor.replace(
    'export default function ProductEditor({ products, onAdd, onUpdate, onDelete, onOptimize, loadingId }',
    'export default function ProductEditor({ products, onAdd, onUpdate, onDelete, onOptimizeDescription, loadingProductId }'
);

// Reemplazar onChange calls
productEditor = productEditor.replace(
    /onChange=\{\\(e\) => onUpdate\(product\.id, 'name', e\.target\.value\)\}/g,
    "onChange={(e) => onUpdate(product.id, { name: e.target.value })}"
);
productEditor = productEditor.replace(
    /onChange=\{\\(e\) => onUpdate\(product\.id, 'price', `\$\$\{e\.target\.value\}`\)\}/g,
    "onChange={(e) => onUpdate(product.id, { price: `$${e.target.value}` })}"
);
productEditor = productEditor.replace(
    /onChange=\{\\(e\) => onUpdate\(product\.id, 'description', e\.target\.value\)\}/g,
    "onChange={(e) => onUpdate(product.id, { description: e.target.value })}"
);

// Reemplazar onOptimize references
productEditor = productEditor.replace(/onOptimize\(/g, "onOptimizeDescription(");
productEditor = productEditor.replace(/loadingId/g, "loadingProductId");

fs.writeFileSync(productEditorPath, productEditor);

console.log('✅ Editores actualizados');
