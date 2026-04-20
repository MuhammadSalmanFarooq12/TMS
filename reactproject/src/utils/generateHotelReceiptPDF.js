import { jsPDF } from "jspdf";

const generateHotelReceiptPDF = (details) => {
  const doc = new jsPDF({ unit: "mm", format: [90, 175] });
  const W = 90;
  const m = 6;
  const cW = W - m * 2;

  const shortId = String(details.bookingId || "N/A").slice(-8).toUpperCase();

  // ── White background ──
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, W, 175, "F");

  // ══════════════════════════════
  // HEADER — teal/green bg for hotel
  // ══════════════════════════════
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.rect(0, 0, W, 22, "F");

  // Barcode — top left inside header
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

  // Brand
  const brandX = bx + 3;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("TRAVELKARU", brandX, 9);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(199, 210, 254);
  doc.text("HOTEL BOOKING", brandX, 14);

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
  // HOTEL NAME + CITY ROW
  // ══════════════════════════════
  let y = 28;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(5.5);
  doc.setTextColor(156, 163, 175);
  doc.text("HOTEL", m, y);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(5.5);
  doc.setTextColor(156, 163, 175);
  doc.text("CITY", W - m, y, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(31, 41, 55);
  const hotelName = doc.splitTextToSize(details.hotelTitle || "—", 38);
  doc.text(hotelName, m, y + 7);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(31, 41, 55);
  doc.text(details.hotelCity || "—", W - m, y + 7, { align: "right" });

  // Center divider with hotel icon circle
  const midX = W / 2;
  doc.setDrawColor(224, 231, 255);
  doc.setLineWidth(0.5);
  doc.line(m + 22, y + 4, midX - 5, y + 4);
  doc.line(midX + 5, y + 4, W - m - 22, y + 4);

  doc.setFillColor(255, 255, 255);
  doc.circle(midX, y + 4, 4, "F");
  doc.setDrawColor(224, 231, 255);
  doc.setLineWidth(0.4);
  doc.circle(midX, y + 4, 4, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6);
  doc.setTextColor(79, 70, 229);
  doc.text("H", midX, y + 6, { align: "center" });

  y += 16;

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

  // Row 1 — Guest name + Check-in
  gridField(col1, "Guest Name", details.guestName);
  gridField(col2, "Check-In", new Date(details.checkIn).toLocaleDateString("en-PK", {
    day: "numeric", month: "short", year: "numeric",
  }), true);
  y += 12;

  // Row 2 — Rooms + Check-out
  gridField(col1, "Rooms", `${details.rooms} Room(s)`);
  gridField(col2, "Check-Out", new Date(details.checkOut).toLocaleDateString("en-PK", {
    day: "numeric", month: "short", year: "numeric",
  }), true);
  y += 12;

  // Row 3 — Nights + Price/night
  const nights = Math.max(1, Math.ceil(
    (new Date(details.checkOut) - new Date(details.checkIn)) / 86400000
  ));
  gridField(col1, "Nights", `${nights} Night(s)`);
  gridField(col2, "Per Night", `PKR ${Number(details.pricePerNight || 0).toLocaleString()}`, true);
  y += 12;

  // Row 4 — Email + Phone
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
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(m, y, cW, 12, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(75, 85, 99);
  doc.text("Total Amount", m + 4, y + 7.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(79, 70, 229); // indigo-600
  doc.text(`PKR ${Number(details.totalPrice || 0).toLocaleString()}`, W - m - 4, y + 7.5, { align: "right" });
  y += 17;

  // ══════════════════════════════
  // NOTE BOX
  // ══════════════════════════════
  doc.setFillColor(255, 251, 235);
  doc.roundedRect(m, y, cW, 18, 2, 2, "F");

  doc.setFillColor(245, 158, 11);
  doc.circle(m + 5, y + 6, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text("!", m + 5, y + 7.8, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6);
  doc.setTextColor(146, 64, 14);
  doc.text("Note:", m + 11, y + 5.5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.8);
  doc.setTextColor(120, 53, 15);
  const note = "Please present this receipt at check-in. Early check-in is subject to availability. Check-out time is 12:00 PM.";
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
  doc.text("TRAVELKARU.COM", W / 2, y + 8, { align: "center" });

  doc.save(`TravelKaru_Hotel_${shortId}.pdf`);
};

export default generateHotelReceiptPDF;
