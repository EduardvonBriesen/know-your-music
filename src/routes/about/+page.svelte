<script lang="ts">
	import { onMount } from 'svelte';
	import RotatingTitle from '../../components/RotatingTitle.svelte';

	let showSecondImage = false;

	function toggleSecondImage() {
		showSecondImage = !showSecondImage;
	}
</script>

<RotatingTitle
	preTitle="We are"
	rotatingWords={['students', 'developers', 'designers', 'creators', 'students']}
	description="We are a talented team fueled by our love for music. 
	Know Your Music is an engaging quiz that expands your knowledge of the music world. 
	Explore and expand your musical knowledge with ease, supported by our insightful learning analytics. 👋"
	showButton={false}
/>

<div class="flex justify-center items-center">
	<div class="m-6 my-14 w-2/3 max-w-8xl">
		<grid class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mt-6">
			<div class="flex flex-col">
				<div class="img_Eduard aspect-square rounded-md max-w-full shadow-lg" />
				<p class="font-semibold mt-4">
					Eduard von Briesen. <span class="text-surface-500"
						>Hey, I'm Eduard, I'll listen to an Album non-stop for weeks, claim its the best thing ever and then forget about it until I rediscover it two years later, realizing it's just okay.</span
					>
				</p>
			</div>
			<div class="flex flex-col">
				<div class="img_Lou aspect-square rounded-md max-w-full shadow-lg" />
				<p class="font-semibold mt-4">
					Louisa Ullmann. <span class="text-surface-500"
						>Hi, I'm Lou and when I go for a run, I switch my Spotify Mode to private so that my friends can't catch me listening to my guilty pleasure playlists.</span
					>
				</p>
			</div>
			<div class="flex flex-col">
				<div class="img_Nick aspect-square rounded-md max-w-full shadow-lg" />
				<p class="font-semibold mt-4">
					Nick Wiele. <span class="text-surface-500"
						>Hi, this is Nick. Spotify is my most used app. Every night, I listen to podcasts to fall asleep, and in the morning, my alarm clock wakes me up with my favorite song.</span
					>
				</p>
			</div>
			<div class="flex flex-col">
				<div class="img_Yousri aspect-square rounded-md max-w-full shadow-lg" />
				<p class="font-semibold mt-4">
					Yousri Cherif. <span class="text-surface-500"
						>Yo, I'm Yousri, the car radio skipper! I can't help but switch songs mid-beat. And yeah, I lower the volume when driving gets stressful.</span
					>
				</p>
			</div>
		</grid>
	</div>
</div>

<style>
	.img_Eduard {
		background: url('/images/Team_Edu.png')
			no-repeat;
		background-size: cover;
		background-position: center;
	}
	.img_Eduard:hover {
		background: url('https://media4.giphy.com/media/qQh0DBncuFJwQ/giphy.gif?cid=ecf05e478utfs28yqdtlv63bi9wnk0mos0x2ssrh8wns9lfg&ep=v1_gifs_search&rid=giphy.gif&ct=g')
			no-repeat;
		background-size: cover;
		background-position: center;
	}

	.img_Lou {
		background: url('/images/Team_Lou.jpg')
			no-repeat;
		background-size: cover;
		background-position: center;
	}
	.img_Lou:hover {
		background: url('https://media.giphy.com/media/2f7RQiiWMJc40/giphy.gif')
			no-repeat;
		background-size: cover;
		background-position: center;
	}

	.img_Nick {
		background: url('/images/Team_Nick.jpg')
			no-repeat;
		background-size: cover;
		background-position: center;
	}
	.img_Nick:hover {
		background: url('https://media.giphy.com/media/UkNA1nFP1q31m/giphy.gif')
			no-repeat;
		background-size: cover;
		background-position: center;
	}

	.img_Yousri {
		background: url('/images/Team_Yousri.jpg')
			no-repeat;
		background-size: cover;
		background-position: center;
	}
	.img_Yousri:hover {
		background: url('https://media1.giphy.com/media/WiM5K1e9MtEic/giphy.gif?cid=ecf05e4746g62qj7y54ux1kjn4pthsp16ro97111wtr8cssf&ep=v1_gifs_search&rid=giphy.gif&ct=g')
			no-repeat;
		background-size: cover;
		background-position: center;
	}

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
