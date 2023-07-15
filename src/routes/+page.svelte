<script>
	import RotatingTitle from '../components/RotatingTitle.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<RotatingTitle
	preTitle="Know your"
	rotatingWords={['music', 'artist', 'band', 'lyrics', 'music']}
	description="Unleash your musical expertise through captivating quizzes, from discography to karaoke
	challenges. Elevate your music knowledge and let your passion shine."
	showButton={true}
/>

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
					Popularity. <span class="text-surface-400"
						>How well do you know the most popular songs of your favorite artists?
					</span>
				</p>
			</div>
			<div class="flex flex-col">
				<img
					class="h-auto max-w-full object-cover rounded-md aspect-square shadow-lg"
					src="/images/Bio_quiz.png"
					alt="Biography"
				/>
				<p class="font-semibold mt-4">
					Biography. <span class="text-surface-400">
						How well do you know the life of your favorite artists? Let's find out and learn more
					</span>
				</p>
			</div>
			<div class="flex flex-col">
				<img
					class="h-auto max-w-full object-cover rounded-md aspect-square shadow-lg"
					src="/images/Discography_quiz.png"
					alt="Discography"
				/>
				<p class="font-semibold mt-4">
					Discography. <span class="text-surface-400">
						When were these albums released? Test your knowledge of your favorite artists'
						discography
					</span>
				</p>
			</div>
			<div class="flex flex-col">
				<img
					class="h-auto max-w-full object-cover rounded-md aspect-square shadow-lg"
					src="/images/Cover_quiz.png"
					alt="Cover"
				/>
				<p class="font-semibold mt-4">
					Cover. <span class="text-surface-400">
						More of a visual learner? Test your knowledge of your favorite artists' album covers
					</span>
				</p>
			</div>
			<div class="flex flex-col">
				<img
					class="h-auto max-w-full object-cover rounded-md aspect-square shadow-lg"
					src="/images/Lyrics_quiz.png"
					alt="Lyrics"
				/>
				<p class="font-semibold mt-4">
					Lyrics. <span class="text-surface-400">
						How well do you know the lyrics of your favorite songs? Let's find out and sing along
					</span>
				</p>
			</div>
		</grid>
	</div>
</div>
