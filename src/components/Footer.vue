<template>
    <footer id="footer" class="footer">
        <div class="container">
            <div class="copyright">
                <p>© COPYRIGHT 2023 (Hello World)</p>
            </div>
        </div>
    </footer>
</template>
  
<script>
export default {
    name: "Footer",
};
</script>
  
<style scoped lang="scss">
.footer {
    // min-height: 5vh;
    height: 5vh;
    background-color: rgb(3, 37, 65);
    padding: 2vh 0 2vh 0;

    p {
        color: aliceblue;
    }
}
</style>