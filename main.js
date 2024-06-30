document.addEventListener('DOMContentLoaded', function () {
    // Google Maps initialization
    async function initMap() {
        const { Map } = await google.maps.importLibrary("maps");

        const mapOptions = {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        };
        const map = new Map(document.getElementById("map"), mapOptions);
    }

    initMap();

    // Image gallery functionality
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const images = document.querySelectorAll('.gallery img');
    let currentIndex = 0;

    function updateGallery() {
        images.forEach((img, index) => {
            img.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateGallery();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateGallery();
    });

    updateGallery();

    // Convai Chat UI SDK initialization
    const apiKey = '675d84a68300f490506bdc2d387c3fe8'; // Reemplaza con tu clave de API real de Convai

    const config = {
        apiKey: apiKey,
        // Aquí se pueden agregar opciones de configuración adicionales según la documentación de Convai
    };

    const chatUI = new ConvaiChatUI(config);

    // Ejemplo: Iniciar una conversación al hacer clic en el botón flotante
    const floatingActionButton = document.getElementById('floating-action-button');
    floatingActionButton.addEventListener('click', () => {
        chatUI.startConversation();
    });

    // Limpieza al desmontar
    window.addEventListener('beforeunload', () => {
        chatUI.destroy();
    });

    // Renderiza el componente ChatBubble en el contenedor 'chat-container'
    const characterId = '675d84a68300f490506bdc2d387c3fe8'; // Reemplaza con tu ID de personaje
    const chatContainer = document.getElementById('chat-container');

    // Función para renderizar el ChatBubble
    function renderChatBubble() {
        const { client } = useConvaiClient(characterId, apiKey); // Asegúrate de que useConvaiClient esté correctamente definida
        chatContainer.innerHTML = ''; // Limpiar contenido existente
        const chatBubble = document.createElement('div');
        chatContainer.appendChild(chatBubble);

        chatUI.renderChatBubble({
            client,
            element: chatBubble,
            chatHistory: "Show",
            chatUiVariant: "Sequential Line Chat"
        });
    }

    // Llama a la función para inicializar el ChatBubble
    renderChatBubble();
});

document.getElementById('floating-action-button').addEventListener('click', function() {
    var chatContainer = document.getElementById('chat-container');
    var isChatOpen = chatContainer.style.display === 'block';

    if (!isChatOpen) {
        chatContainer.style.display = 'block';
    } else {
        chatContainer.style.display = 'none';
        // Redirige a la página de Convai si el chat se cierra
        window.location.href = 'https://convai.com/shared-character?id=fce2d256-2414-11ef-9efd-42010a7be00e';
    }
});
