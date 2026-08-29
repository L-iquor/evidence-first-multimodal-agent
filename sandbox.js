(() => {
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
    message.textContent = 'Ready to evaluate a fictional candidate. Nothing will be uploaded.';
    sceneLabel.textContent = 'candidate not evaluated';
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

    consoleElement.dataset.sandboxState = 'sealing';
    stateLabel.textContent = 'SEALING';
    message.textContent = 'Binding the fictional source package to one task contract.';
    mark(1, 'active', 'RUN');
    await wait(850);
    mark(1, 'pass', 'PASS');

    consoleElement.dataset.sandboxState = 'evaluating';
    stateLabel.textContent = 'EVALUATING';
    message.textContent = 'Comparing the candidate image with the required evidence.';
    sceneLabel.textContent = 'candidate under review';
    mark(2, 'active', 'RUN');
    await wait(1250);
    mark(2, 'pass', 'PASS');

    consoleElement.dataset.sandboxState = 'blocked';
    stateLabel.textContent = 'BLOCKED';
    message.textContent = 'Required object A is missing. The candidate cannot be released.';
    sceneLabel.textContent = 'release blocked — object absent';
    mark(3, 'fail', 'FAIL');
    await wait(1600);

    consoleElement.dataset.sandboxState = 'recovering';
    stateLabel.textContent = 'RECOVERING';
    message.textContent = 'Retrying only the failed generation node. Completed work is preserved.';
    sceneLabel.textContent = 'scoped retry in progress';
    mark(4, 'active run', 'RETRY');
    await wait(1800);
    mark(4, 'pass', 'PASS');

    consoleElement.dataset.sandboxState = 'verified';
    stateLabel.textContent = 'VERIFIED';
    message.textContent = 'The repaired image matches the contract and now has readback proof.';
    sceneLabel.textContent = 'verified — object A present';
    mark(5, 'active', 'RUN');
    await wait(850);
    mark(5, 'pass', 'DONE');

    runButton.disabled = false;
    runButton.firstChild.textContent = 'Run it again ';
  };

  runButton.addEventListener('click', run);
})();
