/**
 * Web Audio API Ambient Cosmic Sound Generator
 */

class SpaceSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.15;
    this.masterGain.connect(this.ctx.destination);
  }

  start() {
    this.init();
    if (!this.ctx || this.isPlaying) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Low cosmic frequency sine wave
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // Deep A1 note

    // Slightly detuned oscillator for ambient chorus warmth
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'sine';
    this.osc2.frequency.setValueAtTime(110.5, this.ctx.currentTime); // A2 note

    // Lowpass filter with slow LFO sweep
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(350, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.1, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    lfo.start();

    this.osc1.connect(this.filter);
    this.osc2.connect(this.filter);
    this.filter.connect(this.masterGain!);

    this.osc1.start();
    this.osc2.start();
    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying) return;
    if (this.osc1) {
      this.osc1.stop();
      this.osc1.disconnect();
    }
    if (this.osc2) {
      this.osc2.stop();
      this.osc2.disconnect();
    }
    this.isPlaying = false;
  }

  setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.3)), this.ctx.currentTime);
    }
  }

  toggle(enable: boolean, volume = 0.5) {
    if (enable) {
      this.start();
      this.setVolume(volume);
    } else {
      this.stop();
    }
  }
}

export const spaceSoundEngine = new SpaceSoundEngine();
