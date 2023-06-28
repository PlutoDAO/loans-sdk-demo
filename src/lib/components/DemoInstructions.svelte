<section class="container">
  <h2>How to use <span class="strong">Pluto Loans SDK Demo</span>?</h2>

  <div class="steps">
    <p>
      1. Connect your Stellar account through Simple Signer. <span class="light"
        >(You can generate a random keypair if you don't have one)<span /></span
      >
    </p>
    <p>2. Set the loan amount you'd like to request.</p>
    <p>3. Settle your debt and withdraw your collateral</p>
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
  }
</style>
