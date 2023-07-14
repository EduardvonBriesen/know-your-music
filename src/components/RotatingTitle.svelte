<script lang="ts">
    export let preTitle: string;
    export let rotatingWords: string[];
    export let description: string;
    export let showButton: boolean;

    const colorClasses = [
        'text-secondary-500',
        'text-error-500',
        'text-tertiary-500',
        'text-success-500',
        'text-secondary-500',
    ];
</script>
  

<section class="text-center">
    <div class="wrapper text-5xl sm:text-7xl 2xl:text-8xl font-bold justify-center mt-16 mb-6 h-14 sm:h-20 2xl:h-28">
        <p>{preTitle}</p>
        <div class="words">
            {#each rotatingWords as world, i}
                <span class="span_titel text-left {colorClasses[i % colorClasses.length]}">{world}</span>
            {/each}
        </div>
    </div>
    <div class="flex justify-center">
        <p class="h4 max-w-xl mx-8">{description}</p>
    </div>
    {#if showButton}
        <button class="btn variant-filled-secondary btn-lg variant-filled m-8"> Start quiz </button>
    {/if}
</section>
  

<style>
    .wrapper {
        box-sizing: border-box;
        box-sizing: content-box;
        display: flex;
    }
    .words {
        box-sizing: border-box;
        overflow: hidden;
    }
    .span_titel {
        box-sizing: border-box;
        display: block;
        height: 100%;
        padding-left: 0.5ch;
        animation: spin_words 6s infinite;
    }
    @keyframes spin_words {
        10% {
            transform: translateY(-105%);
        }
        25% {
            transform: translateY(-100%);
        }
        35% {
            transform: translateY(-205%);
        }
        50% {
            transform: translateY(-200%);
        }
        60% {
            transform: translateY(-305%);
        }
        75% {
            transform: translateY(-300%);
        }
        85% {
            transform: translateY(-405%);
        }
        100% {
            transform: translateY(-400%);
        }
    }
</style>