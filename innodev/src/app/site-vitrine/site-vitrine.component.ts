import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-site-vitrine',
  imports: [CommonModule],
  templateUrl: './site-vitrine.component.html',
  styleUrl: './site-vitrine.component.scss'
})
export class SiteVitrineComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('backgroundVideo', { static: false}) backgroundVideo!: ElementRef<HTMLVideoElement>;

  // Données pour les carrouseles d'images
  carousels = [
    {
      currentIndex: 0,
      autoplayInterval: null as any,
      images: [
        { src: 'assets/vitrine-1-1.jpg', alt: 'Image 1' },
        { src: 'assets/vitrine-1-2.jpg', alt: 'Image 2' },
        { src: 'assets/vitrine-1-3.jpg', alt: 'Image 3' }
      ]
    },
    {
      currentIndex: 0,
      autoplayInterval: null as any,
      images: [
        { src: 'assets/vitrine-2-1.jpg', alt: 'Image 1' },
        { src: 'assets/vitrine-2-2.jpg', alt: 'Image 2' },
        { src: 'assets/vitrine-2-3.jpg', alt: 'Image 3' }
      ]
    },
    {
      currentIndex: 0,
      autoplayInterval: null as any,
      images: [
        { src: 'assets/vitrine-3-1.jpg', alt: 'Image 1' },
        { src: 'assets/vitrine-3-2.jpg', alt: 'Image 2' },
        { src: 'assets/vitrine-3-3.jpg', alt: 'Image 3' }
      ]
    }
  ];

  ngOnInit() {
    // Initialiser l'autoplay pour tous les carrousels
    this.startAutoplay();
  }

  ngAfterViewInit(): void {
    // S'assurer que la vidéo est bien muette au chargement
    if (this.backgroundVideo && this.backgroundVideo.nativeElement) {
      const video = this.backgroundVideo.nativeElement;
      video.muted = true;

      // Ajout d'un listener pour l'événement "ended" comme backup
      video.addEventListener('ended', () => {
        this.restartVideo();
      });
    }

    // Initialiser les animations GSAP après le rendu du DOM
    this.initAnimations();
  }

  ngOnDestroy(): void {
    // Nettoyer les intervalles lors de la destruction du composant
    this.stopAutoplay();
  }

  restartVideo() {
    if (this.backgroundVideo?.nativeElement) {
      this.backgroundVideo.nativeElement.currentTime = 0;
      this.backgroundVideo.nativeElement.play();
    }
  }

  previousImage(carouselsIndex: number) {
    const carousel = this.carousels[carouselsIndex];
    carousel.currentIndex = carousel.currentIndex === 0
      ? carousel.images.length - 1
      : carousel.currentIndex - 1;
    
    // Redémarrer l'autoplay après interaction manuelle
    this.restartCarouselAutoplay(carouselsIndex);
  }

  nextImage(carouselIndex: number) {
    const carousel = this.carousels[carouselIndex];
    carousel.currentIndex = carousel.currentIndex === carousel.images.length - 1
      ? 0
      : carousel.currentIndex + 1;
    
    // Redémarrer l'autoplay après interaction manuelle
    this.restartCarouselAutoplay(carouselIndex);
  }

  // Fonction pour aller directement à une image spécifique
  goToImage(carouselIndex: number, imageIndex: number) {
    this.carousels[carouselIndex].currentIndex = imageIndex;
    // Redémarrer l'autoplay après interaction manuelle
    this.restartCarouselAutoplay(carouselIndex);
  }

  getImageClass(carouselIndex: number, imageIndex: number): string {
    const carousel = this.carousels[carouselIndex];
    const currentIndex = carousel.currentIndex;
    const totalImages = carousel.images.length;
    
    if (imageIndex === currentIndex) {
      return 'active';
    }
    
    // Image précédente (à gauche)
    const prevIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    if (imageIndex === prevIndex) {
      return 'prev';
    }
    
    // Image suivante (à droite)  
    const nextIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    if (imageIndex === nextIndex) {
      return 'next';
    }
    
    // Images cachées
    return 'hidden';
  }

  // Démarrer l'autoplay pour tous les carrousels
  startAutoplay(): void {
    this.carousels.forEach((carousel, index) => {
      carousel.autoplayInterval = setInterval(() => {
        this.nextImage(index);
      }, 10000); // 10 secondes
    });
  }

  // Arrêter l'autoplay pour tous les carrousels
  stopAutoplay(): void {
    this.carousels.forEach(carousel => {
      if (carousel.autoplayInterval) {
        clearInterval(carousel.autoplayInterval);
        carousel.autoplayInterval = null;
      }
    });
  }

  // Redémarrer l'autoplay pour un carrousel spécifique après interaction
  restartCarouselAutoplay(carouselIndex: number): void {
    const carousel = this.carousels[carouselIndex];
    if (carousel.autoplayInterval) {
      clearInterval(carousel.autoplayInterval);
    }
    carousel.autoplayInterval = setInterval(() => {
      this.nextImage(carouselIndex);
    }, 10000);
  }

  // Initialiser toutes les animations GSAP
  private initAnimations(): void {
    // Animation pour le titre principal
    this.animateMainTitle();
    
    // Animation pour les sections
    this.animateSections();
    
    // Animation pour les icônes
    this.animateIcons();
    
    // Animation pour les carrousels
    this.animateCarousels();
  }

  // Animation du titre principal (même que dev-sur-mesure)
  private animateMainTitle(): void {
    const mainTitle = document.querySelector('.main-title');
    
    if (mainTitle) {
      gsap.fromTo(mainTitle, 
        {
          y: -50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mainTitle,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }

  // Animation des sections (apparition en fade-in avec décalage)
  private animateSections(): void {
    const sections = document.querySelectorAll('.section-item');
    
    sections.forEach((section, index) => {
      gsap.fromTo(section,
        {
          y: 80,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol des sections
      this.addHoverAnimation(section);
    });
  }

  // Animation des icônes
  private animateIcons(): void {
    const icons = document.querySelectorAll('.icon-container');
    
    icons.forEach((icon, index) => {
      gsap.fromTo(icon,
        {
          scale: 0,
          rotation: -180,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.4 + 0.5,
          scrollTrigger: {
            trigger: icon,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol des icônes (déjà définie dans le CSS mais on peut l'améliorer)
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.15,
          rotation: 5,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }

  // Animation des carrousels
  private animateCarousels(): void {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach((carousel, index) => {
      gsap.fromTo(carousel,
        {
          scale: 0.8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.4 + 1,
          scrollTrigger: {
            trigger: carousel,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation des boutons de navigation
      const arrows = carousel.querySelectorAll('.carousel-arrow');
      arrows.forEach(arrow => {
        arrow.addEventListener('mouseenter', () => {
          gsap.to(arrow, {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        arrow.addEventListener('mouseleave', () => {
          gsap.to(arrow, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    });
  }

  // Fonction pour ajouter l'animation au survol
  private addHoverAnimation(element: Element): void {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }
}