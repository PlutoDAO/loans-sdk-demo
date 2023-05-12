<script lang="ts">
  import Prism from 'svelte-prism';

  let windowWidth: number;
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Open+Sans:400,700"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://tutsplus.github.io/syntax-highlighter-demos/highlighters/Prism/prism_okaidia.css"
  />
</svelte:head>

<svelte:window bind:outerWidth={windowWidth} />

<div class="snippet-container" style="max-width: 700px">
  <Prism
    language="javascript"
    source={`
    import * as loansSdk from 'pluto-loans-sdk';

    const server = 'testnet';
    let loanStatus: loansSdk.LoanStatusResponse | undefined;
    let isLoading = false;
    let borrower = '';
    let error = '';

    async function getLoanStatus() {
        isLoading = true;
        loanStatus = undefined;
        error = '';

        try {
        loanStatus = await loansSdk.getLoanStatus(server, borrower);
        } catch (e) {
        if (e instanceof Error) {
            const parsedError = JSON.parse(e.message);

            if (parsedError.type === 'LOAN_NOT_FOUND') {
            error = 'Loan not found';
            } else {
            error = parsedError.detail;
            }
        }
        } finally {
        isLoading = false;
        }
    }
    `}
  />
</div>
