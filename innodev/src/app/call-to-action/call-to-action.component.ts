import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
export class CallToActionComponent implements OnInit, AfterViewInit, OnDestroy {
  private scrollTriggerInstance: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Petit délai pour s'assurer que le DOM est complètement rendu
    setTimeout(() => {
      this.initAnimations();
    }, 100);
  }

  ngOnDestroy(): void {
    // Nettoyer les animations GSAP lors de la destruction du composant
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
    }
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger && trigger.trigger.closest('.cta-section')) {
        trigger.kill();
      }
    });
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
    const ctaSection = document.querySelector('.cta-section') as HTMLElement;
    
    if (ctaSection) {
      // Réinitialiser les styles avant d'animer
      gsap.set(ctaSection, { 
        x: 0, 
        opacity: 1,
        clearProps: "all"
      });

      // Créer l'animation avec ScrollTrigger
      this.scrollTriggerInstance = ScrollTrigger.create({
        trigger: ctaSection,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(ctaSection,
            {
              x: -100,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out"
            }
          );
        },
        onLeave: () => {
          gsap.to(ctaSection, {
            x: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in"
          });
        },
        onEnterBack: () => {
          gsap.fromTo(ctaSection,
            {
              x: -100,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out"
            }
          );
        },
        onLeaveBack: () => {
          gsap.to(ctaSection, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          });
        }
      });

      // Animation au survol (sans conflits avec ScrollTrigger)
      ctaSection.addEventListener('mouseenter', () => {
        if (ctaSection.style.opacity !== '0') {
          gsap.to(ctaSection, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      ctaSection.addEventListener('mouseleave', () => {
        gsap.to(ctaSection, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }
  }
}