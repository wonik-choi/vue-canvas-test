<script setup lang="ts"></script>

<template>
    <section class="flex items-center justify-center w-full h-lvh bg-secondary-gray">
        <div class="w-full flex flex-col justify-center items-center gap-[2rem] max-w-[110rem]">
            <header class="h-auto w-fit">
                <div class="text-lg font-semibold text-primary-black font-pretended">
                    Susimdal RED TEST
                </div>
            </header>
            <main class="flex items-start justify-center w-full">
                <slot></slot>
            </main>
        </div>
    </section>
</template>
