(() => {
  const walkthrough = document.querySelector('#walkthrough-video');
  if (walkthrough && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    walkthrough.play().catch(() => {
      // Browser policy may require the visitor to press play; controls remain visible.
    });
  }

  const consoleElement = document.querySelector('.sandbox-console');
  const runButton = document.querySelector('#run-sandbox');
  const stateLabel = document.querySelector('#sandbox-state');
  const message = document.querySelector('#sandbox-message');
  const sceneLabel = document.querySelector('.sandbox-scene-label');
  const steps = [...document.querySelectorAll('.sandbox-log li')];

  if (!consoleElement || !runButton || !stateLabel || !message || !sceneLabel || !steps.length) return;

  const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

  const reset = () => {
    consoleElement.dataset.sandboxState = 'ready';
    stateLabel.textContent = 'READY';
    message.textContent = 'Ready to run a sanitized behavior loop. Nothing will be uploaded.';
    sceneLabel.textContent = 'awaiting interpretation';
    steps.forEach((step) => {
      step.className = '';
      step.querySelector('em').textContent = 'WAIT';
    });
  };

  const mark = (stepNumber, className, label) => {
    const step = steps[stepNumber - 1];
    step.className = className;
    step.querySelector('em').textContent = label;
  };

  const run = async () => {
    reset();
    runButton.disabled = true;
    runButton.firstChild.textContent = 'Running case ';

    consoleElement.dataset.sandboxState = 'observing';
    stateLabel.textContent = 'OBSERVING';
    message.textContent = 'Starting from a vague human need and its observable behavior.';
    mark(1, 'active', 'RUN');
    await wait(900);
    mark(1, 'pass', 'PASS');

    consoleElement.dataset.sandboxState = 'mapping';
    stateLabel.textContent = 'MAPPING';
    message.textContent = 'Proposing how the person may search, compare, and narrow the choice.';
    sceneLabel.textContent = 'search hypothesis formed';
    mark(2, 'active', 'RUN');
    await wait(1300);
    mark(2, 'pass', 'PASS');

    consoleElement.dataset.sandboxState = 'verifying';
    stateLabel.textContent = 'VERIFYING';
    message.textContent = 'Checking the proposed path against fresh source posts and engagement.';
    sceneLabel.textContent = 'fresh evidence matched';
    mark(3, 'active', 'RUN');
    await wait(1400);
    mark(3, 'pass', 'PASS');

    consoleElement.dataset.sandboxState = 'interpreting';
    stateLabel.textContent = 'INTERPRETING';
    message.textContent = 'The real job is a small ritual that switches work mode off.';
    sceneLabel.textContent = 'desired state identified';
    mark(4, 'active', 'RUN');
    await wait(1500);
    mark(4, 'pass', 'PASS');

    consoleElement.dataset.sandboxState = 'acting';
    stateLabel.textContent = 'ACTING';
    message.textContent = 'Issuing one content task: show the moment her evening begins.';
    sceneLabel.textContent = 'media decision issued';
    mark(5, 'active', 'RUN');
    await wait(1350);
    mark(5, 'pass', 'PASS');

    consoleElement.dataset.sandboxState = 'learning';
    stateLabel.textContent = 'LEARNING';
    message.textContent = 'Reading, saving, store, and purchase outcomes return to the next cycle.';
    sceneLabel.textContent = 'loop closed';
    mark(6, 'active', 'RUN');
    await wait(1200);
    mark(6, 'pass', 'DONE');

    runButton.disabled = false;
    runButton.firstChild.textContent = 'Run loop again ';
  };

  runButton.addEventListener('click', run);
})();
