/**
 * GSAP Plugins Shim
 * 
 * This file provides shim implementations of premium GSAP plugins
 * that are being used in the project but are not available in the standard version.
 * 
 * For production use, you should consider purchasing the official plugins from GreenSock:
 * https://greensock.com/club/
 */

import { gsap } from 'gsap';

// DrawSVGPlugin shim
export const DrawSVGPlugin = {
  name: 'drawSVG',
  init(target, vars) {
    // Simple shim that just sets the stroke-dashoffset to 0
    // This won't animate the drawing effect but will prevent build errors
    if (target.setAttribute) {
      gsap.set(target, {
        strokeDasharray: '100%',
        strokeDashoffset: vars === 0 ? '100%' : '0%'
      });
    }
    return true;
  }
};

// MorphSVGPlugin shim
export const MorphSVGPlugin = {
  name: 'morphSVG',
  init(target, endShape) {
    // Simple shim that doesn't actually morph
    return true;
  }
};

// SplitText shim
export class SplitText {
  constructor(target, options) {
    this.target = target;
    this.options = options;
    
    // Create a simple implementation that just wraps the text in spans
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (element) {
      // Store original text
      this.originalText = element.innerHTML;
      
      // Create a simple split by wrapping each word in a span
      if (options && options.type) {
        if (options.type.includes('lines')) {
          // For line splitting, we'll just create an array of the element itself
          this.lines = [element];
        }
        
        if (options.type.includes('words')) {
          // For word splitting, we'll do nothing in this shim
          this.words = [];
        }
        
        if (options.type.includes('chars')) {
          // For char splitting, we'll do nothing in this shim
          this.chars = [];
        }
      }
    }
  }
  
  // Method to revert the split
  revert() {
    const element = typeof this.target === 'string' ? document.querySelector(this.target) : this.target;
    if (element && this.originalText) {
      element.innerHTML = this.originalText;
    }
  }
}

// MotionPathPlugin shim
export const MotionPathPlugin = {
  name: 'motionPath',
  init(target, vars) {
    // Simple shim that doesn't actually follow a path
    return true;
  }
};

// Register the plugins with GSAP
gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin);