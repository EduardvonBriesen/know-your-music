<script>
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="text-center">
	<div class="wrapper text-7xl font-bold justify-center mt-12 mb-6">
		<p>Know your</p>
		<div class="words">
			<span class="text-[#775AFF]">music</span>
			<span class="text-[#00B487]">artist</span>
			<span class="text-[#FFC549]">band</span>
			<span class="text-[#F23F3A]">lyrics</span>
			<span class="text-[#775AFF]">music</span>
		</div>
	</div>
	<div class="flex justify-center">
		<p class="h4 max-w-xl">
			Unleash your musical expertise through captivating quizzes, from discography to karaoke challenges. Elevate your music knowledge and let your passion shine.
		</p>
	</div>
</section>

<div class="flex justify-center m-12">
	<div class="card inline-flex bg-surface-50">
		<section class="grid grid-cols-2 md:grid-cols-3 gap-6 m-6">
			<div>
				<img class="h-auto max-w-full rounded-lg h-32 w-32" src="https://i1.sndcdn.com/artworks-xAWEGB45fDRpdzK6-HsujxA-t500x500.jpg" alt="Music genre">
			</div>
			<div>
				<img class="h-auto max-w-full rounded-lg h-32 w-32" src="https://i1.sndcdn.com/artworks-5sFSLyXzRzi2zDVR-zFpEvA-t500x500.jpg" alt="Music genre">
			</div>
			<div>
				<img class="h-auto max-w-full rounded-lg h-32 w-32" src="https://i1.sndcdn.com/artworks-GdA6fc4IL3VuJLzf-NZd2kQ-t500x500.jpg" alt="Music genre">
			</div>
			<div>
				<img class="h-auto max-w-full rounded-lg h-32 w-32" src="https://i1.sndcdn.com/artworks-7C2fy04scYMmZEy6-a2HEvw-t500x500.jpg" alt="Music genre">
			</div>
			<div>
				<img class="h-auto max-w-full rounded-lg h-32 w-32" src="https://i1.sndcdn.com/artworks-J5lxGRQPxpLdjkaG-3rpIGw-t500x500.jpg" alt="Music genre">
			</div>
			<div>
				<img class="h-auto max-w-full rounded-lg h-32 w-32" src="https://i1.sndcdn.com/artworks-fUsulTTmtx8Tte7g-78t7ZA-t500x500.jpg" alt="Music genre">
			</div>
		</section>
	</div>
</div>


<style>
	.wrapper{
		box-sizing: border-box;
		box-sizing: content-box;
		display: flex;
		height: 90px;
	}
	.words{
		box-sizing: border-box;
		overflow: hidden;
	}
	span{
		box-sizing: border-box;
		display: block;
		height: 100%;
		padding-left: 8px;
		animation: spin_words 6s infinite;
	}
	@keyframes spin_words{
		10%{
			transform: translateY(-105%);
		}
		25%{
			transform: translateY(-100%);
		}
		35%{
			transform: translateY(-205%);
		}
		50%{
			transform: translateY(-200%);
		}
		60%{
			transform: translateY(-305%);
		}
		75%{
			transform: translateY(-300%);
		}
		85%{
			transform: translateY(-405%);
		}
		100%{
			transform: translateY(-400%);
		}
	}
</style>