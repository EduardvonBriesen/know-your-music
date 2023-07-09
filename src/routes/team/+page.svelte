<script lang="ts">
  import { onMount } from 'svelte';

let showSecondImage = false;

function toggleSecondImage() {
  showSecondImage = !showSecondImage;
}
</script>

<section class="text-center">
	<div class="wrapper text-5xl sm:text-7xl 2xl:text-8xl font-bold justify-center mt-16 mb-6 h-14 sm:h-20 2xl:h-28">
		<p>We are</p>
		<div class="words">
			<span class="span_titel text-left text-[#775AFF]">students</span>
			<span class="span_titel text-left text-[#00B487]">developers</span>
			<span class="span_titel text-left text-[#FFC549]">designers</span>
			<span class="span_titel text-left text-[#F23F3A]">creators</span>
			<span class="span_titel text-left text-[#775AFF]">students</span>
		</div>
	</div>
	<div class="flex justify-center">
		<p class="h4 max-w-xl mx-8">
			Nunc blandit posuere metus quis maximus. Proin eleifend elit purus, in tempus justo facilisis finibus. 👋
		</p>
	</div>
</section>

<div class="flex justify-center items-center">
	<div class="m-6 my-14 w-2/3 max-w-8xl">
		<grid class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mt-6 ">
			<div class="flex flex-col">
				<div class="img_Eduard aspect-square rounded-md max-w-full shadow-lg"></div>
				<p class="font-semibold mt-4"> Eduard von Briesen. <span class="text-[#86868b]">Pellentesque tristique nisi sed ullamcorper pellentesque. Morbi ultricies ligula quis ipsum elementum iaculis. Sed sit.</span> </p>
			</div>
			<div class="flex flex-col">
				<div class="img_Lou aspect-square rounded-md max-w-full shadow-lg"></div>
				<p class="font-semibold mt-4"> Louisa Ullmann. <span class="text-[#86868b]">Sed dignissim magna sit amet suscipit viverra. Nunc vulputate metus dapibus felis laoreet, nec pharetra.</span> </p>
			</div>
			<div class="flex flex-col">
				<div class="img_Nick aspect-square rounded-md max-w-full shadow-lg"></div>
				<p class="font-semibold mt-4"> Nick Wiele. <span class="text-[#86868b]">Nunc blandit posuere metus quis maximus. Proin eleifend elit purus, in tempus justo facilisis finibus.</span></p>
			</div>
			<div class="flex flex-col">
				<div class="img_Yousri aspect-square rounded-md max-w-full shadow-lg"></div>
				<p class="font-semibold mt-4"> Yousri Cherif. <span class="text-[#86868b]">Media informatic student at LMU. My favorite item type is Guess the Cover since I have a good visual memory.</span> </p>
			</div>
		</grid>
	</div>
</div>


<style>
	.img_Eduard{
        background: url("https://res2.weblium.site/res/5d8a4cab41a27e002608256a/5d8cbe95dff27b00280a6dde_optimized.webp") no-repeat;
		background-size: cover;
		background-position: center; 
	}
	.img_Eduard:hover{
		background: url("https://media4.giphy.com/media/qQh0DBncuFJwQ/giphy.gif?cid=ecf05e478utfs28yqdtlv63bi9wnk0mos0x2ssrh8wns9lfg&ep=v1_gifs_search&rid=giphy.gif&ct=g") no-repeat;
		background-size: cover;
		background-position: center; 
	}

	.img_Lou{
        background: url("https://res2.weblium.site/res/5d8a4cab41a27e002608256a/5d8cbe36122259002633ffed_optimized.webp") no-repeat;
		background-size: cover;
		background-position: center; 
	}
	.img_Lou:hover{
		background: url("https://media1.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif?cid=ecf05e47ro0nxywhyvgrxv8kms4k247euy53rzqvojas0eh2&ep=v1_gifs_search&rid=giphy.gif&ct=g") no-repeat;
		background-size: cover;
		background-position: center; 
	}

	.img_Nick{
        background: url("https://res2.weblium.site/res/5d8a4cab41a27e002608256a/5d8cbe3c92ab87002626d409_optimized.webp") no-repeat;
		background-size: cover;
		background-position: center; 
	}
	.img_Nick:hover{
		background: url("https://media1.giphy.com/media/WiM5K1e9MtEic/giphy.gif?cid=ecf05e4746g62qj7y54ux1kjn4pthsp16ro97111wtr8cssf&ep=v1_gifs_search&rid=giphy.gif&ct=g") no-repeat;
		background-size: cover;
		background-position: center; 
	}

	.img_Yousri{
        background: url("https://res2.weblium.site/res/5d8a4cab41a27e002608256a/5d8cbe3a337247002601d4b4_optimized.webp") no-repeat;
		background-size: cover;
		background-position: center; 
	}
	.img_Yousri:hover{
		background: url("https://media2.giphy.com/media/5VKbvrjxpVJCM/giphy.gif?cid=ecf05e47sf2zo4uskkiiherfzfn1xm1bmy0ytqjx6qjgkjw3&ep=v1_gifs_search&rid=giphy.gif&ct=g") no-repeat;
		background-size: cover;
		background-position: center; 
	}


	.wrapper{
		box-sizing: border-box;
		box-sizing: content-box;
		display: flex;
	}
	.words{
		box-sizing: border-box;
		overflow: hidden;
	}
	.span_titel{
		box-sizing: border-box;
		display: block;
		height: 100%;
		padding-left: 0.5ch;
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