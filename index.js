"use strict";

function iniciar() {

	const RESOLUCION_PC = 1080;

	const $awp = document.getElementById('awp');
	const $aplicacion = document.getElementById('aplicacion');
	const $informacion = document.getElementById('informacion');
	const $titulo = document.getElementById('titulo');
	const $subtitulo = document.getElementById('subtitulo');
	const $imagen = document.getElementById('imagen');
	const $contacto = document.getElementById('contacto');
	const $contactoImagen = document.getElementById('contacto-imagen');
	const $descripcion = document.getElementById('descripcion');

	function activarServiceWorker() {

		const RESOLUCION_MAXIMA = Math.max(window.screen.width, window.screen.height);

		// Registro el ServiceWorker para hacer una Aplicación Web Progresiva si el navegador lo permite, claro.
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker.register('./service-worker.js?resolucion=' + RESOLUCION_MAXIMA)
					.then((registration) => {
						console.log('"Service Worker" registrado con éxito en el ámbito:', registration.scope);
					})
					.catch((error) => {
						console.log('Falló el registro del "Service Worker" por el error:', error)
					})
			})
		} else {
			console.log('Este navegador NO soporta la tecnología Service Worker y adiós a la Aplicación Web Progresiva.');
		}
		// Final del ServiceWorker

	}

	function ajustarContacto() {

		if (window.innerWidth < window.innerHeight) {	// Modo Retrato: El enlace funciona normal y llama por telefono al propietario de la APP.
			$contacto.href = 'tel://+34676901346';
			$contactoImagen.title = 'Contactar por Teléfono';
			$imagen.scrollTo(0, 0);
		}
		else { // Modo Paisaje: El enlace escribe un correo al propietario de la APP.
			$contacto.href = "mailto:javiermartin@alcobendas04.com";
			$contactoImagen.title = 'Contactar por Correo Electrónico';
		}

	}

	function ajustarImagen() {

		$awp.style.overflow = 'auto';
		$awp.style.position = 'relative';
		$aplicacion.style.maxHeight = 'none';
		$informacion.style.maxHeight = 'none';
		if (window.innerWidth <= RESOLUCION_PC && window.innerWidth > window.innerHeight) {
			console.log("Lo controla el CSS en modo panorámico.");
		}
		else {
			let alturaMaxima = window.innerHeight * 0.96;
			if ($aplicacion.clientHeight < alturaMaxima) {
				$awp.style.overflow = 'hidden';
				$awp.style.position = 'absolute';
				$aplicacion.style.maxHeight = '96vh';
				$informacion.style.maxHeight = '96vh';
			}
		}
		
	}

	function iniciarDatos() {

		$titulo.innerText = 'Feliz Cumpleaños !!!';
		$subtitulo.innerText = 'Pasa un enorme día y siempre';
		$descripcion.innerHTML = `<a id="twitter" name="twitter" title="Twitter de Pitu" href="https://twitter.com/javi_pitu">¿Qué te parece tener una Aplicación Móvil como Tablón de Anuncios de tu Club?</a>`;
		 
	}

	function iniciarListeners() {

		window.addEventListener('orientationchange', orientarPantalla);
		window.addEventListener('resize', ajustarImagen);
		// $contacto.addEventListener('click', anularClick);

	}

	function orientarPantalla() {

		ajustarImagen();

		ajustarContacto();

	}

	function anularClick(evento) {
	// Anular el Click en el modo panorámico del móvil.
		function interruptorDeClase(elemento, clase) {
			elemento.classList.contains(clase) ? elemento.classList.remove(clase) : elemento.classList.add(clase);
		}
		if (window.innerWidth <= RESOLUCION_PC && window.innerWidth > window.innerHeight) {
			evento.preventDefault();
			// interruptorDeClase($imagen, 'scroll');
		}
	}

	activarServiceWorker();

	// iniciarDatos();

	orientarPantalla();

	iniciarListeners();

}

window.document.addEventListener('DOMContentLoaded', iniciar);