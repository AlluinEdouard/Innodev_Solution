import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NgFor, NgIf } from '@angular/common';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface Realisation {
  id: number;
  title: string;
  image: string;
  description: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-realisations',
  imports: [NgFor, NgIf],
  templateUrl: './realisations.component.html',
  styleUrls: ['./realisations.component.scss']
})
export class RealisationsComponent implements OnInit, AfterViewInit {
  videoSource: string = 'assets/background-video-realisations.mp4';
  @ViewChild('backgroundVideo') videoElement!: ElementRef<HTMLVideoElement>;
  
  realisations: Realisation[] = [
    {
      id: 1,
      title: 'Planification',
      image: 'assets/planification.png',
      description: 'Développement d\'une application mobile dédiée à la gestion des plannings des agents de sécurité.',
      isExpanded: false
    },
    {
      id: 2,
      title: 'WMS_Logistique',
      image: 'assets/WMS_logistique.png',
      description: 'WMS pour un entrepôt de 4000m2, intégrant des tablettes pour les utilisateurs et le scan des palettes à l\'entrée et à la sortie, avec suivi des mouvements, reporting, facturation, classement automatique et analyse en temps réel des rotations pour une optimisation et rangement.',
      isExpanded: false 
    },
    {
      id: 3,
      title: 'Gestion_Atelier',
      image: 'assets/gestion_atelier.png',
      description: 'Pour un garage VL & PL, création d\'application pour la gestion opérationnelle complète : ordres de travail, facturation, planification, gestion des stocks, commandes, etc.',
      isExpanded: false
    },
    {
      id: 4,
      title: 'TMS / Planification',
      image: 'assets/tms_planification.png',
      description: 'Pour une PME de 250 salariés, outil de planification des transports pour 100 conduteurs sur deux écrans géants tactiles',
      isExpanded: false
    },
    {
      id: 5,
      title: 'Application mobile',
      image: 'assets/application_mobile.png',
      description: 'Application pour conducteurs routiers, conçue pour la gestion quotidienne des opérations : planning, temps de service, congés, messagerie, etc.',
      isExpanded: false
    },
    {
      id: 6,
      title: 'Site vitrine',
      image: 'assets/site_vitrine.png',
      description: 'Site vitrine',
      isExpanded: false
    },
    {
      id: 7,
      title: 'Gestion petits colis',
      image: 'assets/gestion_petits_colis.png',
      description: 'Pour une entreprise de transport de petits colis, nous avons développé une application complète pour la gestion des heures, la planification, la facturation et la gestion du parc.',
      isExpanded: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // S'assurer que la vidéo est bien muette au chargement
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.muted = true;

      // Ajout d'un listener pour l'événement "ended" comme backup
      video.addEventListener('ended', () => {
        this.restartVideo();
      });
    }

    // Initialiser les animations GSAP après le rendu du DOM
    this.initAnimations();
  }

  // Fonction pour redémarrer la vidéo quand elle se termine
  restartVideo(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.currentTime = 0;
      video.play();
    }
  }
  
  // Fonction pour agrandir/réduire une réalisation
  toggleRealisation(id: number): void {
    // Fermer toutes les autres réalisations
    this.realisations.forEach(realisation => {
      if (realisation.id !== id) {
        realisation.isExpanded = false;
      }
    });
    
    // Toggle la réalisation sélectionnée
    const realisation = this.realisations.find(r => r.id === id);
    if (realisation) {
      realisation.isExpanded = !realisation.isExpanded;
    }
  }

  // Initialiser toutes les animations GSAP
  private initAnimations(): void {
    // Animation pour le titre principal
    this.animateTitle();
    
    // Animations pour les réalisations
    this.animateRealisations();
  }

  // Animation du titre principal
  private animateTitle(): void {
    const title = document.querySelector('.main-title');
    
    if (title) {
      gsap.fromTo(title, 
        {
          y: -50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3
        }
      );
    }
  }

  // Animations des réalisations avec effet zigzag
  private animateRealisations(): void {
    const realisationItems = document.querySelectorAll('.realisation-item');
    
    realisationItems.forEach((item, index) => {
      const isEven = index % 2 === 0;
      const animationDirection = isEven ? -100 : 100;
      
      gsap.fromTo(item,
        {
          x: animationDirection,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }
}