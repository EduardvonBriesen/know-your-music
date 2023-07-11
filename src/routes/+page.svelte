<script>
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="text-center">
	<div
		class="wrapper text-5xl sm:text-7xl 2xl:text-8xl font-bold justify-center mt-16 mb-6 h-14 sm:h-20 2xl:h-28"
	>
		<p>Know your</p>
		<div class="words">
			<span class="span_titel text-left text-[#775AFF]">music</span>
			<span class="span_titel text-left text-[#00B487]">artist</span>
			<span class="span_titel text-left text-[#FFC549]">band</span>
			<span class="span_titel text-left text-[#F23F3A]">lyrics</span>
			<span class="span_titel text-left text-[#775AFF]">music</span>
		</div>
	</div>
	<div class="flex justify-center">
		<p class="h4 max-w-xl mx-8">
			Unleash your musical expertise through captivating quizzes, from discography to karaoke
			challenges. Elevate your music knowledge and let your passion shine.
		</p>
	</div>
	<button class="btn variant-filled-secondary btn-lg variant-filled m-8"> Start quiz </button>
</section>
<div class="flex justify-center items-center">
	<div class="m-6 my-24 w-2/3 max-w-7xl">
		<h2 class="text-3xl font-bold">Our quizzes</h2>
		<grid
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6"
		>
			<div class="flex flex-col">
				<img
					class="h-auto max-w-full object-cover rounded-md aspect-square shadow-lg"
					src="/images/Popularity_quiz.png"
					alt="Popularity"
				/>
				<p class="font-semibold mt-4">
					Popularity. <span class="text-[#86868b]"
						>Pellentesque tristique nisi sed ullamcorper pellentesque. Morbi ultricies ligula quis
						ipsum elementum iaculis. Sed sit.</span
					>
				</p>
			</div>
			<div class="flex flex-col">
				<img
					class="h-auto max-w-full object-cover rounded-md aspect-square shadow-lg"
					src="/images/Bio_quiz.png"
					alt="Biography"
				/>
				<p class="font-semibold mt-4">
					Biography. <span class="text-[#86868b]"
						>Sed dignissim magna sit amet suscipit viverra. Nunc vulputate metus dapibus felis
						laoreet, nec pharetra.</span
					>
				</p>
			</div>
			<div class="flex flex-col">
				<img
					class="h-auto max-w-full object-cover rounded-md aspect-square shadow-lg"
					src="/images/Discography_quiz.png"
					alt="Discography"
				/>
				<p class="font-semibold mt-4">
					Discography. <span class="text-[#86868b]"
						>Nunc blandit posuere metus quis maximus. Proin eleifend elit purus, in tempus justo
						facilisis finibus.</span
					>
				</p>
			</div>
			<div class="flex flex-col">
				<img
					class="h-auto max-w-full object-cover rounded-md aspect-square shadow-lg"
					src="/images/Cover_quiz.png"
					alt="Cover"
				/>
				<p class="font-semibold mt-4">
					Cover. <span class="text-[#86868b]"
						>Integer malesuada mollis sollicitudin. Quisque nec nisl vel augue gravida posuere.
						Quisque ultrices tempor nisl.</span
					>
				</p>
			</div>
			<div class="flex flex-col">
				<img
					class="h-auto max-w-full object-cover rounded-md aspect-square shadow-lg"
					src="/images/Lyrics_quiz.png"
					alt="Lyrics"
				/>
				<p class="font-semibold mt-4">
					Lyrics. <span class="text-[#86868b]"
						>Integer malesuada mollis sollicitudin. Quisque nec nisl vel augue gravida posuere.
						Quisque ultrices tempor nisl.</span
					>
				</p>
			</div>
		</grid>
	</div>
</div>


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
