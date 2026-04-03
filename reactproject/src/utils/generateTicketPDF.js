import { jsPDF } from "jspdf";

const generateTicketPDF = (details, type) => {
  // Portrait card — matches the HTML design proportions
  const doc = new jsPDF({ unit: "mm", format: [90, 175] });
  const W = 90;
  const m = 6;
  const cW = W - m * 2;

  const shortId = String(details.bookingId || "N/A").slice(-8).toUpperCase();

  // ── White background ──
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, 175, "F");

  // ══════════════════════════════
  // HEADER — indigo bg
  // ══════════════════════════════
  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, W, 22, "F");

  // Barcode — top left inside header (small)
  const barWidths = [1.8, 0.4, 1.2, 0.4, 2, 0.4, 0.8, 0.4, 1.6, 0.4, 1.2, 0.4, 0.8, 0.4, 2, 0.4, 0.8, 0.4, 1.6, 0.4, 1.2];
  let bx = m;
  const barY = 3;
  const barH = 7;
  barWidths.forEach((bw, i) => {
    if (i % 2 === 0) {
      doc.setFillColor(255, 255, 255);
      doc.rect(bx, barY, bw, barH, "F");
    }
    bx += bw + 0.4;
  });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(4.5);
  doc.setTextColor(199, 210, 254);
  doc.text(shortId, m, barY + barH + 3);

  // Brand — pushed right of barcode
  const brandX = bx + 3;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("TRAVELKARU", brandX, 9);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(199, 210, 254);
  doc.text("PREMIUM TRAVEL", brandX, 14);

  // REF top right
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(199, 210, 254);
  doc.text("REF:", W - m, 9, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text(shortId, W - m, 14, { align: "right" });

  // ══════════════════════════════
  // FROM → TO ROW
  // ══════════════════════════════
  let y = 28;

  // From
  doc.setFont("helvetica", "bold");
  doc.setFontSize(5.5);
  doc.setTextColor(156, 163, 175); // gray-400
  doc.text("FROM", m, y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(31, 41, 55); // gray-800

  const fromLabel = type === "route" ? (details.from || "—")
    : type === "fleet" ? (details.busName || "—")
    : (details.packageTitle || "—");

  const toLabel = type === "route" ? (details.to || "—")
    : type === "fleet" ? (details.busRoute || "—")
    : "Package";

  doc.text(fromLabel, m, y + 7);

  // To (right aligned)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(5.5);
  doc.setTextColor(156, 163, 175);
  doc.text("TO", W - m, y, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(31, 41, 55);
  doc.text(toLabel, W - m, y + 7, { align: "right" });

  // Center divider line with bus icon circle
  const midX = W / 2;
  doc.setDrawColor(224, 231, 255); // indigo-100
  doc.setLineWidth(0.5);
  doc.line(m + 22, y + 4, midX - 5, y + 4);
  doc.line(midX + 5, y + 4, W - m - 22, y + 4);

  // Bus icon circle
  doc.setFillColor(255, 255, 255);
  doc.circle(midX, y + 4, 4, "F");
  doc.setDrawColor(224, 231, 255);
  doc.setLineWidth(0.4);
  doc.circle(midX, y + 4, 4, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6);
  doc.setTextColor(79, 70, 229);
  doc.text("B", midX, y + 6, { align: "center" });

  y += 16;

  // ══════════════════════════════
  // DASHED DIVIDER
  // ══════════════════════════════
  doc.setDrawColor(209, 213, 219); // gray-300
  doc.setLineWidth(0.3);
  doc.setLineDashPattern([1.2, 1.2], 0);
  doc.line(m, y, W - m, y);
  doc.setLineDashPattern([], 0);
  y += 5;

  // ══════════════════════════════
  // DETAILS GRID — 2 columns
  // ══════════════════════════════
  const col1 = m;
  const col2 = W / 2 + 2;

  const gridField = (x, label, value, rightAlign = false) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.5);
    doc.setTextColor(156, 163, 175);
    if (rightAlign) {
      doc.text(label.toUpperCase(), W - m, y, { align: "right" });
    } else {
      doc.text(label.toUpperCase(), x, y);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(31, 41, 55);
    const val = String(value ?? "—");
    if (rightAlign) {
      doc.text(val, W - m, y + 5, { align: "right" });
    } else {
      doc.text(val, x, y + 5);
    }
  };

  // Row 1
  gridField(col1, "Passenger", details.passengerName);
  gridField(col2, "Date", new Date(details.travelDate).toLocaleDateString("en-PK", {
    day: "numeric", month: "short", year: "numeric",
  }), true);
  y += 12;

  // Row 2
  const seatLabel = `${details.seats} (Confirmed)`;
  gridField(col1, "Seat", seatLabel);

  const detailRight = type === "route"
    ? (details.distanceKm ? `${details.distanceKm} km` : "—")
    : type === "fleet"
    ? (details.numberPlate || "—")
    : `PKR ${Number(details.pricePerSeat || 0).toLocaleString()}`;

  const detailRightLabel = type === "route" ? "Distance"
    : type === "fleet" ? "Plate No."
    : "Per Person";

  gridField(col2, detailRightLabel, detailRight, true);
  y += 12;

  // Row 3 — email + phone
  gridField(col1, "Email", details.email);
  gridField(col2, "Phone", details.phone, true);
  y += 12;

  // ══════════════════════════════
  // DASHED DIVIDER
  // ══════════════════════════════
  doc.setDrawColor(209, 213, 219);
  doc.setLineWidth(0.3);
  doc.setLineDashPattern([1.2, 1.2], 0);
  doc.line(m, y, W - m, y);
  doc.setLineDashPattern([], 0);
  y += 5;

  // ══════════════════════════════
  // TOTAL AMOUNT BOX
  // ══════════════════════════════
  doc.setFillColor(249, 250, 251); // gray-50
  doc.roundedRect(m, y, cW, 12, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(75, 85, 99); // gray-600
  doc.text("Total Amount", m + 4, y + 7.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(79, 70, 229); // indigo-600
  doc.text(`PKR ${Number(details.totalPrice || 0).toLocaleString()}`, W - m - 4, y + 7.5, { align: "right" });
  y += 17;

  // ══════════════════════════════
  // AMBER NOTE BOX
  // ══════════════════════════════
  doc.setFillColor(255, 251, 235); // amber-50
  doc.roundedRect(m, y, cW, 18, 2, 2, "F");

  // Warning icon circle
  doc.setFillColor(245, 158, 11); // amber-500
  doc.circle(m + 5, y + 6, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text("!", m + 5, y + 7.8, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6);
  doc.setTextColor(146, 64, 14); // amber-800
  doc.text("Note:", m + 11, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.8);
  doc.setTextColor(120, 53, 15);
  const note = "Please arrive at the station at least 30 minutes before departure. All passengers with advance bookings must check in on time.";
  const noteLines = doc.splitTextToSize(note, cW - 14);
  doc.text(noteLines, m + 11, y + 10);
  y += 22;

  // ══════════════════════════════
  // DARK FOOTER
  // ══════════════════════════════
  doc.setFillColor(17, 24, 39);
  doc.rect(0, y, W, 175 - y, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(107, 114, 128);
  doc.text("BOOKKARU.COM", W / 2, y + 8, { align: "center" });

  doc.save(`TravelKaru_Receipt_${shortId}.pdf`);
};

export default generateTicketPDF;
