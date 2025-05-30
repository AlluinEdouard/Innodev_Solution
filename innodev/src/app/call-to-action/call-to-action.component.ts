import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss']
})
export class CallToActionComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Initialiser les animations GSAP après le rendu du DOM
    this.initAnimations();
  }

  // Fonction pour gérer le clic sur le bouton
  onContactClick(): void {
    // Navigation vers la page contact
    this.router.navigate(['/contact']);
  }

  // Initialiser les animations GSAP
  private initAnimations(): void {
    this.animateCtaSection();
  }

  // Animation de la section CTA depuis la gauche
  private animateCtaSection(): void {
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
      gsap.fromTo(ctaSection,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaSection,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au survol
      ctaSection.addEventListener('mouseenter', () => {
        gsap.fromTo(ctaSection,
          {
            x: -50,
            opacity: 0.9
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          }
        );
      });
    }
  }
}