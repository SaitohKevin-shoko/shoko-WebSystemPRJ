function addressSearch() {
  var address = document.getElementsByName('adr270address1')[0].value;
  var address2 = document.getElementsByName('adr270address2')[0].value;

  if (address == null) {
      address = address2;
  } else if (address2 != null) {
      address += address2;
  }

  if (address != null) {
      address = encodeURIComponent(address);
  }

  searchGoogleMap(address);
  return false;
}
