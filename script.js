function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
  }


function generateEmail() {

    const clientName = document.getElementById("clientName").value.trim();
    const DOL = document.getElementById("dol").value;
    const repDate = document.getElementById("lorDate").value;

    const LOA = document.getElementById("loa").checked;
    const DEC = document.getElementById("dec").checked;
    const PD = document.getElementById("pd").checked;

    // Helper text chunks
    const chunks = {
      LOA: `a letter of acknowledgment addressed to SEARS Injury Law, confirming receipt of our representation of our client, ${clientName}, DOL ${DOL}`,
      DEC: `any available declaration pages regarding our client, ${clientName}, DOL ${DOL}`,
      PD: `any available color property damage photos, vehicle estimates, or total loss documentation regarding our client, ${clientName}’s vehicle, DOL ${DOL}`
    };
  
    const extraNote = `\nIf these documents are not available or are handled by another party, any information you can provide regarding the appropriate contact would be appreciated.`;
  
    const closing = `\n
  If the requested documents have already been provided, thank you for your patience. Feel free to forward them directly to this email so we can ensure they are properly filed in the client’s case.
  
  Thank you for your time and assistance,`;
  
    // Determine order and selections
    const selected = [];
    if (LOA) selected.push("LOA");
    if (DEC) selected.push("DEC");
    if (PD) selected.push("PD");
  
    if (selected.length === 0) return "No document type selected.";
  
    // Begin building email
    let email = "Hello,\n\n";
    const [primary, ...additional] = selected;
  
    // Primary request
    email += `I am reaching out to request ${chunks[primary]}.`;
  
    // Letter of representation date (always after primary)
    if (repDate) {
      email += ` A letter of representation was sent on ${repDate}.`;
    }
  
    // Handle "Please also provide..." section for additional requests
    if (additional.length > 0) {
      // Convert array of extra items into correct grammar
      const extraChunks = additional.map(key => {
        if (key === "DEC") return "declaration pages";
        if (key === "PD") return "colored property damage photos, vehicle estimates, or total loss documentation";
      });
  
      // Combine with commas and "and"
      const extrasText = extraChunks.length === 1
        ? extraChunks[0]
        : `${extraChunks.slice(0, -1).join(", ")}, and ${extraChunks.slice(-1)}`;
  
      email += `\n\nPlease also provide any available ${extrasText} currently on file.`;
  
      if (additional.includes("PD")) {
        email += ` ${extraNote}`;
      }
    } else if (selected.length === 1 && selected[0] === "PD") {
      // Add PD's extra sentence if it's the only one selected
      email += ` ${extraNote}`;
    } else if (selected.length === 1 && selected[0] !== "LOA") {
      // Add extra note if single DEC selected
      email += ` ${extraNote}`;
    }
  
    // Add closing
    email += closing;
    document.getElementById("output").value = email;
  }
  
  

  