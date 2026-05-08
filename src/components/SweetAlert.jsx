import Swal from "sweetalert2";

export const SweetAlert = async (formValues) => {
  const { value: newValues } = await Swal.fire({
    title: "Multiple inputs",
    html: `
      <div style="text-align: left;">
        <label for="swal-input1">TEXT: "TEST1"</label>
        <input id="swal-input1" class="swal2-input">
        <label for="swal-input2">TEXT: "TEST2"</label>
        <input id="swal-input2" class="swal2-input">
      </div>
    `,
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
      ];
    },
  });

  // ถ้าผู้ใช้กดตกลงและมีค่ากลับมา
  if (newValues) {
    Swal.fire(JSON.stringify(newValues));
  }
};
