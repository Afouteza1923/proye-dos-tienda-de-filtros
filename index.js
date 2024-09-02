//! Crear el header y añadirlo al body
const header = document.createElement ('header');
document.body.appendChild (header);

//! Crear contenedor del header
const container = document.createElement ('div');
container.className = 'header-container';
header.appendChild (container);

//! Crear el contenedor del menú desplegable con su icono
const containerDropdown = document.createElement ('div')
containerDropdown.className = 'menu'
const menu = document.createElement ('img');
menu.className = 'menu-icon';
menu.src = 'assets/menu.png';
menu.alt = 'menú desplegable';
container.appendChild (containerDropdown);
containerDropdown.appendChild (menu);

//! Crear la lista de elementos del menú desplegable "PRIMERA CREACIÓN"
const menuElements = document.createElement ('ul');
menuElements.className = 'elements';
containerDropdown.appendChild (menuElements);

//! Definir los elementos del menú deplegable
const dropdown = [
    {Text: 'Vestidos', className: 'clothes', href: '#', category: 'vestido'},
    {Text: 'Blazers', className: 'clothes', href: '#', category: 'blazer'},
    {Text: 'Bermudas', className: 'clothes', href: '#', category: 'bermuda'},
    {Text: 'Camisetas', className: 'clothes', href: '#', category: 'camiseta'},
    {Text: 'Sneakers', className: 'footwear', href: '#', category: 'sneakers'},
    {Text: 'Mochilas', className: 'accesories', href: '#', category: 'mochila'},
    {Text: 'Gafas', className: 'accesories', href: '#', category: 'gafa'},
    {Text: 'Usuario', className: 'user', href: '#'},
    {Text: 'Carrito de la compra', className: 'shopping', href: '#'},
    {Text: 'Buscar', className: 'search', href: '#'}, 
];

//! Añadimos los elementos al menú desplegable "HAMBURGUESA" cuando se aplican @media
dropdown.forEach (item => {
    const li = document.createElement ('li');
    li.className = 'li-dropdown';
    const a = document.createElement ('a');
    a.textContent = item.Text;
    a.href = item.href;
    a.className = item.className
    menuElements.appendChild (li);
    li.appendChild (a);

    //! Añadir el evento de click para filtrar productos
    if (item.category) { //? Sólo añadir eventos a los elementos que tienen categoría
        a.addEventListener ('click', (e) => {
            e.preventDefault ();
            const filteredProducts = products.filter (product => product.description.toLowerCase().includes (item.category));
            renderProducts (filteredProducts);
            menuElements.classList.remove ('show'); //? Cerrar el menú después de hacer la selección
        });
    }
});

//! Añadir un botón para limpiar los filtros
const clearButton = document.createElement ('li');
clearButton.className = 'li-dropdown clear-filters';
const clearFiltersLink = document.createElement ('a');
clearFiltersLink.textContent = 'Mostrar todo';
clearFiltersLink.href = '#';
clearButton.appendChild (clearFiltersLink);
menuElements.appendChild (clearButton);

//! Evento para limpiar filtros y mostrar todos los productos
clearFiltersLink.addEventListener ('click', (e) => {
    e.preventDefault();
    renderProducts (products);
    menuElements.classList.remove ('show'); //? Cerrar el menú después de hacer la selección
});

//! Añadir el evento de click al icono del menú desplegable
menu.addEventListener ('click', (e) => {
    e.stopPropagation ();
    menuElements.classList.toggle ('show');
});

//! Cerrar el menú al hacer click fuera de él
document.addEventListener ('click', (e) => {
    if (!containerDropdown.contains (e.target)) {
        menuElements.classList.remove ('show');
    }
});

//! Crear el logo y añadirlo al contenedor
const logo = document.createElement ('img');
logo.src = 'assets/logotipo_jmfernaal.png';
logo.alt = 'Logotipo de jmfernaalshop';
logo.className = 'header-logo';
container.appendChild (logo);

//! Crear el menú de navegación "PRIMERA CREACIÓN"
const nav = document.createElement ('nav');
nav.className = 'header-nav';
const ul = document.createElement ('ul');
container.appendChild (nav);

//? CÓDIGO PARA RENDERIZAR USANDO LA SECCIÓN CON EL ID #products

function renderProducts (products) {
    const container = document.getElementById ('products');
    container.innerHTML = ''; //? Limpiar el contenedor antes de agregar nuevos productos

    products.forEach (product => {
        const productElement = document.createElement ('div');
        productElement.className = 'product';
        productElement.setAttribute('data-category', getCategory (product));
        
        const productImages = document.createElement ('div');
        productImages.className = 'product-images';
        product.images.forEach (imgUrl => {
            const img = document.createElement ('img');
            img.src = imgUrl;
            img.alt = product.description;
            productImages.appendChild (img);
        });
        
        const productInfo = document.createElement ('div');
        productInfo.className = 'product-info';

        const description = document.createElement ('h2');
        description.textContent = product.description;

        const price = document.createElement ('p');
        price.textContent = `€${product.price.toFixed (2)}`;

        productInfo.appendChild (description);
        productInfo.appendChild (price);
        
        productElement.appendChild (productImages);
        productElement.appendChild (productInfo);
        container.appendChild (productElement);
    });
};

//! Función para determinar la categoría de un producto 
function getCategory(product) {
    const description = product.description.toLowerCase ();
    if (description.includes ('vestido') || description.includes ('blazer') || description.includes ('camiseta') || description.includes ('bermuda')) {
        return 'ROPA';
    } else if (description.includes ('sneakers')) {
        return 'CALZADO';
    } else if (description.includes ('mochila') || description.includes ('gafas')) {
        return 'COMPLEMENTOS';
    }
};

//? USAR LA SECCIÓN CON ID #products PARA MOSTRAR LOS PRODUCTOS FILTRADOS
 
const menuItems = ['ROPA', 'CALZADO', 'COMPLEMENTOS'];

menuItems.forEach (item => {
    const li = document.createElement ('li');
    li.className = 'li-nav';
    const buttonCategories = document.createElement ('button');
    buttonCategories.className = 'button-nav';
    buttonCategories.textContent = item;
    li.appendChild (buttonCategories);
    ul.appendChild (li);

    buttonCategories.addEventListener ('click', () => { 
        const filteredProducts = products.filter (product => getCategory (product) === item); 
        renderProducts (filteredProducts); 
    }); 
});

//? BOTÓN PARA MOSTRAR TODOS LOS PRODUCTOS

const showAllButton = document.createElement('button');
showAllButton.className = 'button-nav';
showAllButton.textContent = 'MOSTRAR TODO';
ul.appendChild(showAllButton);

showAllButton.addEventListener('click', () => {
    renderProducts(products);
});

nav.appendChild (ul);

//! Crear un contenedor div para los inputs del encabezado
const inputContainer = document.createElement ('div');
inputContainer.className = 'header-inputs';

//! Input de búsqueda
const searchInput = document.createElement ('input');
searchInput.type = 'search';
searchInput.placeholder = 'Buscar';

//! Input de usuario (icono)
const userInput = document.createElement ('button');
userInput.className = 'user-input';
const userIcon = document.createElement ('img');
userIcon.src = 'assets/perfil-del-usuario.png';
userIcon.alt = "Usuario";
userInput.appendChild (userIcon);

//! Input de carrito de la compra (icono)
const cartInput = document.createElement("button");
cartInput.className = "cart-input";
const cartIcon = document.createElement("img");
cartIcon.src = 'assets/bolsa-de-la-compra.png';
cartIcon.alt = "Carrito de la compra";
cartInput.appendChild (cartIcon);

//! Agregar los inputs al contenedor de inputs
inputContainer.appendChild (searchInput);
inputContainer.appendChild (userInput);
inputContainer.appendChild (cartInput);

//! Agregar los inputs en el contenedor inputContaniner al contenedor Container
container.appendChild (inputContainer);

//! Creamos el main y el h1 al que le añadimos el texto 'NUEVA COLECCIÓN VERANO 2024' 
const main = document.createElement ('main');
const h1 = document.createElement ('h1');
h1.textContent = 'NUEVA COLECCIÓN VERANO 2024';

//! Agregar el h1 al main
main.appendChild (h1);

//! Encontrar el header e insertar el main despues del header
const headerElement = document.querySelector ('header');
    if (headerElement) {
        headerElement.insertAdjacentElement ('afterend', main);
    }

//! Creamos el elemento video y le añadimos una clase y los elementos de control
const video = document.createElement ('video');
video.src = 'assets/Video_portada_proyecto2.mov';
video.className = 'video-banner';
video.controls = true;
video.autoplay = true;
video.loop = true;
video.muted = true;

//! Agregar el video al main
main.appendChild (video);

//! Crear la sección de filtros
const filtersDiv = document.createElement('div');
filtersDiv.className = 'filters';

//! Crear filtros de talla
const sizeLabel = document.createElement('label');
sizeLabel.textContent = 'Talla:';
const sizeSelect = document.createElement('select');
sizeSelect.id = 'filter-size';
const sizes = ['', 'Única', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '35', '36', '37', '37.5', '38', '38.5', '39', '39.5', '40', '41', '42', '43', '44', '45'];
sizes.forEach(size => {
    const option = document.createElement('option');
    option.value = size;
    option.textContent = size ? size : 'Todas';
    sizeSelect.appendChild(option);
});
filtersDiv.appendChild(sizeLabel);
filtersDiv.appendChild(sizeSelect);

//! Crear filtros de color
const colorLabel = document.createElement('label');
colorLabel.textContent = 'Color:';
const colorSelect = document.createElement('select');
colorSelect.id = 'filter-color';
const colors = ['', 'Coral', 'Verde', 'Marrón', 'Beige', 'Azul Marino', 'Blanco', 'Gris', 'Rojo', 'Morado', 'Amarillo', 'Negro', 'Azul negro', 'Amarillo negro'];
colors.forEach(color => {
    const option = document.createElement('option');
    option.value = color;
    option.textContent = color ? color : 'Todos';
    colorSelect.appendChild(option);
});
filtersDiv.appendChild(colorLabel);
filtersDiv.appendChild(colorSelect);

//! Crear filtros de género
const genderLabel = document.createElement('label');
genderLabel.textContent = 'Género:';
const genderSelect = document.createElement('select');
genderSelect.id = 'filter-gender';
const genders = ['', 'Mujer', 'Hombre', 'Unisex'];
genders.forEach(gender => {
    const option = document.createElement('option');
    option.value = gender;
    option.textContent = gender ? gender : 'Todos';
    genderSelect.appendChild(option);
});
filtersDiv.appendChild(genderLabel);
filtersDiv.appendChild(genderSelect);

//! Crear botón de aplicar filtros
const applyFiltersButton = document.createElement('button');
applyFiltersButton.id = 'apply-filters';
applyFiltersButton.textContent = 'Aplicar Filtros';
filtersDiv.appendChild(applyFiltersButton);

//! Añadir filtros al main
main.appendChild(filtersDiv);


//! Función para limpiar filtros
function clearFilters() {
    document.getElementById('filter-size').value = '';
    document.getElementById('filter-color').value = '';
    document.getElementById('filter-gender').value = '';
    displayProducts(products);
}

//! Añadir botón para limpiar filtros al DOM
const clearFiltersButton = document.createElement('button');
clearFiltersButton.id = 'clear-filters';
clearFiltersButton.innerText = 'Limpiar Filtros';
document.querySelector('.filters').appendChild(clearFiltersButton);

clearFiltersButton.addEventListener ('click', clearFilters);


//! Crear la sección de productos con el id #products y una clase .grid-products
const section = document.createElement('section');
section.id = 'products';
section.className = 'grid-products';
main.appendChild(section);

//! Crear array de productos
const products = [
    {
        images: [
            'https://emarola.com/media/catalog/product/cache/c42fb9b6c501c8804cef70ed877bc735/2/7/27042022132321001.jpg',
            'https://emarola.com/media/catalog/product/cache/c42fb9b6c501c8804cef70ed877bc735/2/7/27042022132408002.jpg',
        ],
        code: '73522',
        description: 'Vestido Estampado Floral',
        size: ['XS', 'S', 'M', 'L'],
        colors: ['Coral', ''],
        gender: 'Mujer',
        price: 29.99,
    },
    {
        images: [
            'https://emarola.com/media/catalog/product/cache/c42fb9b6c501c8804cef70ed877bc735/1/4/14072022135315081.jpg',
            'https://emarola.com/media/catalog/product/cache/c42fb9b6c501c8804cef70ed877bc735/1/4/14072022135440082.jpg',
        ],
        code: '73567',
        description: 'Vestido Popelín Paneles',
        size: ['XS', 'S', 'M', 'L'],
        colors: ['Verde', ''],
        gender: 'Mujer',
        price: 29.99,
    },
    {
        images: [
            'https://emarola.com/media/catalog/product/cache/c42fb9b6c501c8804cef70ed877bc735/d/s/dsc03846.jpg',
            'https://emarola.com/media/catalog/product/cache/c42fb9b6c501c8804cef70ed877bc735/d/s/dsc03860.jpg',
        ],
        code: '78907',
        description: 'Blazer Con Lino',
        size: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Marrón', ''],
        gender: 'Mujer',
        price: 59.99,
    },
    {
        images: [
            'https://emarola.com/media/catalog/product/cache/c42fb9b6c501c8804cef70ed877bc735/d/s/dsc01569.jpg',
            'https://emarola.com/media/catalog/product/cache/c42fb9b6c501c8804cef70ed877bc735/1/3/13122023131243032.jpg',
        ],
        code: '73920',
        description: 'Vestido Mini Estampado',
        size: ['XS', 'S', 'M', 'L'],
        colors: ['Beige', ''],
        gender: 'Mujer',
        price: 49.99,
    },
    {
        images: [
            'https://www.brandsdistribution.com/prod/product-145391-1420467443.jpg/large.jpg',
        ],
        code: 'TIPS130IT_85',
        description: 'Camiseta Plein Sport',
        size: ['S', 'M', 'L', 'XL'],
        colors: ['Azul Marino', ''],
        gender: 'Hombre',
        price: 39.99,
    },
    {
        images: [
            'https://www.brandsdistribution.com/prod/product-145126-1495745225.jpg/large.jpg',
            'https://www.brandsdistribution.com/prod/product-145126-1837041782.jpg/large.jpg',
        ],
        code: 'XO73_5348306_1',
        description: 'Bermuda Armata Di Mare',
        size: ['S', 'M', 'L', 'XL'],
        colors: ['Blanco', ''],
        gender: 'Hombre',
        price: 35.99
    },
    {
        images: [
            'https://www.brandsdistribution.com/prod/product-143758-634232083.jpg/large.jpg',
            'https://www.brandsdistribution.com/prod/product-143758-1035195773.jpg/large.jpg',
            'https://www.brandsdistribution.com/prod/product-143758-220664845.jpg/large.jpg'
        ],
        code: 'AMOAM10713_ACE',
        description: 'Mochila Tommy Hilfiger',
        size: ['Única'],
        colors: ['Marrón', ''],
        gender: 'Hombre',
        price: 49.99
    },
    {
        images: [
            'https://www.brandsdistribution.com/prod/product-137488-1546497257.jpg/large.jpg',
            'https://www.brandsdistribution.com/prod/product-137488-1304245771.jpg/large.jpg',
            'https://www.brandsdistribution.com/prod/product-137488-82783088.jpg/large.jpg',
            'https://www.brandsdistribution.com/prod/product-137482-1954249611.jpg/large.jpg'
        ],
        code: 'S70752-1',
        description: 'Sneakers Saucony Shadow-5000',
        size: ['36', '37', '37.5', '38', '38.5', '39', '40'],
        colors: ['Verde', 'Gris', ''],
        gender: 'Unisex',
        price: 88.99
    },
    {
        images: [
            'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/edc78b07-d326-418a-8778-8a95b4df4ab1/air-max-dn-se-zapatillas-4PdLm8.png',
            'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/66dea115-576b-4a7c-b0f1-05f9596e4ba9/air-max-dn-se-zapatillas-4PdLm8.png',
            'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f3c36ef6-f3c7-415a-acd5-85aa20442404/air-max-dn-se-zapatillas-4PdLm8.png',
        ],
        code: 'HM0810-401',
        description: 'Sneakers Nike Air Max Dn SE',
        size: ['38', '39', '39.5', '40', '42', '43', '45'],
        colors: ['Azul negro', ''],
        gender: 'Hombre',
        price: 179.99
    },
    {
        images: [
            'https://cdn.deporvillage.com/cdn-cgi/image/h=1800,w=1800,dpr=2,f=auto,q=75,fit=contain,background=white/product/ok-0oo9463-60_001.jpg',
            'https://cdn.deporvillage.com/cdn-cgi/image/h=1800,w=1800,dpr=2,f=auto,q=75,fit=contain,background=white/product/ok-0oo9463-60_002.jpg',
            'https://cdn.deporvillage.com/cdn-cgi/image/h=1800,w=1800,dpr=2,f=auto,q=75,fit=contain,background=white/product/ok-0oo9463-60_003.jpg',
            'https://cdn.deporvillage.com/cdn-cgi/image/h=1800,w=1800,dpr=2,f=auto,q=75,fit=contain,background=white/product/ok-0oo9463-60_004.jpg',
        ],
        code: 'OO9463-6039',
        description: 'Gafas Oakley Sutro Lite 2024 Tour De France™',
        size: ['Única'],
        colors: ['Amarillo negro', ''],
        gender: 'Unisex',
        price: 208.00
    }
];

//! Seleccionamos el contenedor donde vamos a añadir los productos
const productsContainer = document.getElementById ('products');

//! Función para crear y mostrar los productos
function displayProducts (filteredProducts) {
    //! Limpiar el contenedor de productos
    productsContainer.innerHTML = '';

    //! Anadir productos sugeridos cuando no se encuentra ningún producto con los filtros introducidos.
    if (filteredProducts.length === 0) {
        const suggestedProducts = document.createElement ('h2');
        suggestedProducts.textContent = 'No se entrontrarón productos con los filtros aplicados, a continuación le sugerimos los siguientes productos:';
        productsContainer.appendChild (suggestedProducts);

        //! Mostrar 3 productos aleatorios
        const randomProducts = [];
        while (randomProducts.length < 3) {
            const randomIndex = Math.floor (Math.random () * products.length);
            if (!randomProducts.includes (products [randomIndex])) {
                randomProducts.push (products [randomIndex]);
            }
        }
        filteredProducts = randomProducts;
    }

    //! Creamos elementos HTML para cada producto
    filteredProducts.forEach(product => {
        //! Creamos el contenedor del producto y le agregamos una clase con classList.add
        const productDiv = document.createElement ('div');
        productDiv.classList.add ('product');

        //! Añadimos las imágenes del producto
        const imagesDiv = document.createElement('div');
        let currentImageIndex = 0;
        const img = document.createElement('img');
        img.src = product.images[currentImageIndex];
        img.alt = product.description;
        imagesDiv.appendChild(img);

        //! Añadir event listener para cambiar imagen al hacer click
        img.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % product.images.length;
            img.src = product.images[currentImageIndex];
        });
        productDiv.appendChild(imagesDiv);

        //! Añadimos el código de producto
        const codeProduct = document.createElement ('p');
        codeProduct.textContent = `Código: ${product.code}`;
        productDiv.appendChild (codeProduct);

        //! Añadimos la descripción de producto
        const descriptionProduct = document.createElement ('h3');
        descriptionProduct.textContent = `${product.description}`;
        productDiv.appendChild (descriptionProduct);

        //! Añadimos las tallas del producto
        const sizeProduct = document.createElement ('p');
        sizeProduct.textContent = `Talla: ${product.size.join (', ')}`;
        productDiv.appendChild (sizeProduct);

        //! Añadimos los colores de producto
        const colorProduct = document.createElement ('p');
        colorProduct.textContent = `Color: ${product.colors.filter (Boolean).join (', ')}`;
        productDiv.appendChild (colorProduct);

        //! Añadimos el género del producto
        const genderProduct = document.createElement ('p');
        genderProduct.textContent = `Género: ${product.gender}`;
        productDiv.appendChild (genderProduct);

        //! Añadimos el precio del producto
        const priceProduct = document.createElement ('p');
        priceProduct.textContent = `PVP: ${product.price.toFixed (2)} €`;
        productDiv.appendChild (priceProduct);

        //! Añadimos el contenedor del producto al contenedor principal de nombre productsContainer
        productsContainer.appendChild (productDiv);
    });
}

//! Mostrar todos los productos al cargar la página
displayProducts(products);

//! Función para aplicar filtros
function applyFilters() {
    const selectedSize = document.getElementById('filter-size').value;
    const selectedColor = document.getElementById('filter-color').value;
    const selectedGender = document.getElementById('filter-gender').value;

    const filteredProducts = products.filter(product => {
        const matchSize = selectedSize === '' || product.size.includes(selectedSize);
        const matchColor = selectedColor === '' || product.colors.includes(selectedColor);
        const matchGender = selectedGender === '' || product.gender === selectedGender;
        return matchSize && matchColor && matchGender;
    });

    displayProducts(filteredProducts);
}

//! Añadir event listener al botón de aplicar filtros y limpiar filtros
document.getElementById('apply-filters').addEventListener('click', applyFilters);

// *----------------------------------APARTADO DE SUSCRIPCIÓN-------------------------------------------------------*
//! Crear 'div' para suscripción con la clase .suscription
const suscription = document.createElement ('div');
suscription.className = 'suscription';
//! Crear un 'h2' con la clase .subscribe y le agregamos texto con textContent
const subscribe = document.createElement ('h2');
subscribe.textContent = 'Suscríbete a nuestra Newsletter y obtén un 10% de descuento en tu próxima compra';
subscribe.className = 'subscribe';
//! Crear 'imput' tipo 'email' para introducir el email y suscribirse con la clase .newsletter
const emailInput = document.createElement ('input');
emailInput.type = 'email';
emailInput.className = 'newsletter';
emailInput.placeholder = 'Introduce aquí tu email';
//! Añadir al documento 
suscription.appendChild (subscribe);
suscription.appendChild (emailInput);
main.appendChild (suscription);

// *-----------------------------------APARTADO DE POLITICA DE PRIVACIDAD---------------------------------------------*
//! Crear 'div' de política de privacidad con la clase .privacypolicy
const privacyPolicy = document.createElement ('div');
privacyPolicy.className = 'privacy-policy';
//! Crear input tipo checkbox para aceptar la política de privacidad con la clase .check
const checkBox = document.createElement ('input');
checkBox.type = 'checkbox';
checkBox.className = 'check';
//! Crear 'label' al cual le agregamos texto con textContent y 'a' con enlace a la política de privacidad
const iRead = document.createElement ('label');
const seePolicy = document.createElement ('a');
seePolicy.href = '';
seePolicy.textContent = 'Política de privacidad';
iRead.textContent = 'He leído y acepto la';
//! Anadir al documento 
privacyPolicy.appendChild (checkBox);
privacyPolicy.appendChild (iRead);
privacyPolicy.appendChild (seePolicy);
main.appendChild (privacyPolicy);

// *-----------------------------------------------BOTON--------------------------------------------------------------*
//! Crear 'button' con la clase .dto le agregamos texto con textContent
const buttonDto = document.createElement ('button');
buttonDto.className = 'dto';
buttonDto.textContent = 'RECIBIR MI DESCUENTO';
//! Anadir al documento
main.appendChild (buttonDto);

// *-----------------------------------------------FOOTER-------------------------------------------------------------*
//! Crear el footer 
const footer = document.createElement ('footer');
document.body.appendChild (footer);

//! Crear el ul del footer con una clase 
const ulFooter = document.createElement ('ul');
ulFooter.className = 'information'
footer.appendChild (ulFooter);

//! Crear el menú de información 
const menuInfo = ['Aviso Legal', 'Condiciones Generales', 'Política de Privacidad', '¿Quienes Somos?', 'Prensa', 'Tiendas', 'Atención al Cliente', 'Preguntas Frecuentes', 'Tarjeta Regalo Online'];
menuInfo.forEach (info => {
    const liFooter = document.createElement ('li');
    const aFooter = document.createElement ('a');
    aFooter.href = `#${info.toUpperCase ().replace (/ /g, '-')}`;
    aFooter.textContent = info;
    liFooter.appendChild (aFooter);
    ulFooter.appendChild (liFooter);
});

//! Crear contenedor de los medios de pago en este caso un 'div' con la clase .payment-methods
const pay = document.createElement ('div');
pay.className = 'payment-methods';
footer.appendChild (pay);

//! Crear método de pago Mastercard
const mastercard = document.createElement ('img');
mastercard.src = 'assets/mastercard.png';
mastercard.alt = 'Tarjeta Mastercard';
mastercard.className = 'master';
pay.appendChild (mastercard);

//! Crear método de pago Visa
const visa = document.createElement ('img');
visa.src = 'assets/visa.png';
visa.alt = 'Tarjeta visa';
visa.className = 'visa';
pay.appendChild (visa);

//! Crear método de pago PayPal
const paypal = document.createElement ('img');
paypal.src = 'assets/paypal.png';
paypal.alt = 'PayPal';
paypal.className = 'pal';
pay.appendChild (paypal);

//! Crear método de pago Tarjeta Regalo
const card = document.createElement ('img');
card.src = 'assets/tarjeta-de-regalo.png';
card.alt = 'Tarjeta Regalo'
card.className = 'gift-card';
pay.appendChild (card);

// *------------------------------------------------REDES SOCIALES-------------------------------------------------------------*
//! Crear 'ul' con la clase .rrss
const ulSocial = document.createElement ('ul');
ulSocial.className = 'rrss';
//! Definir las redes sociales y sus respectivos atributos
const socialMedia = [
    { className: 'fb', href: 'https://www.facebook.com', target: '_blank', rel: 'noopener', src: 'assets/facebook.png', alt: 'facebook' },
    { className: 'inst', href: 'https://www.instagram.com', src: 'assets/instagram.png', alt: 'instagram' },
    { className: 'x', href: 'https://twitter.com', src: 'assets/gorjeo.png', alt: 'x antes twitter' },
    { className: 'ytube', href: 'https://youtube.com', src: 'assets/youtube.png', alt: 'youtube' },
  ];
//! Crear los 'li' y 'a' de cada red social
socialMedia.forEach (social => {
    const liSocial = document.createElement ('li');
    liSocial.className = 'li-social';
    const aSocial = document.createElement ('a');
    aSocial.className = social.className;
    aSocial.href = social.href;
    aSocial.target = social.target;
    aSocial.rel = social.rel;
    const imgSocial = document.createElement ('img');
    imgSocial.src = social.src;
    imgSocial.alt = social.alt;
//! Añadimos al documento
    footer.appendChild (ulSocial);
    ulSocial.appendChild (liSocial);
    liSocial.appendChild (aSocial); 
    aSocial.appendChild (imgSocial);   
}); 

//! Crear donde se menciona al creador de la pagina
const cite = document.createElement ('cite');
cite.textContent = '©️ 2024 jmfernaal';
footer.appendChild (cite);
