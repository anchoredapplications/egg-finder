<script setup lang="ts">
const { signOut } = useAuth();
onMounted(async () => {
  await signOut({ callbackUrl: '/' });
});
</script>
