<section class="container">
  <h2>How to use <span class="strong">Pluto Loans SDK Demo</span>?</h2>

  <div class="steps">
    <p>
      <span class="step-number">1. </span>Connect your Stellar account through Simple Signer. <br />
      <span class="light">(You can generate a random keypair if you don't have one)</span>
    </p>
    <p><span class="step-number">2. </span>Set the loan amount you'd like to request.</p>
    <p><span class="step-number">3. </span>Settle your debt and withdraw your collateral</p>
  </div>
</section>

<style>
  .container {
    text-align: center;
    margin: 30px auto;
  }

  .container h2 {
    font-weight: 400;
    margin: 0;
    margin-bottom: 30px;
  }

  .strong {
    font-weight: 600;
  }

  .light {
    color: rgba(0, 0, 0, 0.6);
  }

  @media (prefers-color-scheme: dark) {
    .light {
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .steps {
    display: grid;
    gap: 10px;
    max-width: 500px;
    margin: 0 auto;
    font-size: 1.1rem;
  .step-number {
    font-weight: 300;
  }
</style>
