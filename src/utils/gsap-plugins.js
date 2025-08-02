import gsap from 'gsap';

// Shim para DrawSVGPlugin (plugin premium)
export const DrawSVGPlugin = {
  name: 'drawSVG',
  init(target, vars) {
    console.warn('DrawSVGPlugin es un plugin premium de GSAP. Esta es una implementación simulada.');
    return true;
  },
  version: '3.12.7'
};

// Shim para MorphSVGPlugin (plugin premium)
export const MorphSVGPlugin = {
  name: 'morphSVG',
  init(target, vars) {
    console.warn('MorphSVGPlugin es un plugin premium de GSAP. Esta es una implementación simulada.');
    return true;
  },
  version: '3.12.7'
};

// Shim para SplitText (plugin premium)
export const SplitText = class {
  constructor(target, vars) {
    console.warn('SplitText es un plugin premium de GSAP. Esta es una implementación simulada.');
    this.chars = [];
    this.words = [];
    this.lines = [];
    this.elements = typeof target === 'string' ? document.querySelectorAll(target) : [target];
  }
  revert() {
    console.warn('SplitText.revert() llamado en la implementación simulada.');
  }
};

// Shim para MotionPathPlugin (plugin premium)
export const MotionPathPlugin = {
  name: 'motionPath',
  init(target, vars) {
    console.warn('MotionPathPlugin es un plugin premium de GSAP. Esta es una implementación simulada.');
    return true;
  },
  version: '3.12.7'
};

// Registrar los plugins con GSAP
gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin);